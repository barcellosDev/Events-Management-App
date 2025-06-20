using back_end.Data;
using back_end.Dtos;
using back_end.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace back_end.Services
{
    public class AuthService(EventsManagementDbContext ctx, IConfiguration configuration) : IAuthService
    {
        public async Task<TokenResponseDto?> LoginAsync(LoginUserDto request)
        {
            var user = await ctx.
                Users
                .Include(u => u.Role)
                .FirstOrDefaultAsync(u => u.Email == request.Email);

            if (user == null)
            {
                throw new Exception("User não encontrado");
            }

            if (new PasswordHasher<User>().VerifyHashedPassword(user, user.PasswordHash, request.Password) == PasswordVerificationResult.Failed)
            {
                throw new Exception("Senhas não coincidem");
            }
            TokenResponseDto response = await CreateTokenResponse(user);
            return response;
        }

        private async Task<TokenResponseDto> CreateTokenResponse(User user)
        {
            return new TokenResponseDto { 
                AccessToken = CreateToken(user), 
                RefreshToken = await GenerateAndSaveRefreshTokenAsync(user),
                RoleName = user.Role.Name
            };
        }

        public async Task<object?> RegisterAsync(RegisterUserDto request)
        {
            if (await ctx.Users.AnyAsync(u => u.Email == request.Email))
            {
                throw new Exception("Email is in use");
            }

            var role = await ctx.Roles.FindAsync(request.RoleId);

            if (role == null)
            {
                throw new Exception("Verify your role option");
            }

            var user = new User
            {
                Username = request.Username,
                RoleId = request.RoleId,
                Role = role,
                Email = request.Email,
            };

            var hashedPass = new PasswordHasher<User>().HashPassword(user, request.Password);

            user.PasswordHash = hashedPass;

            ctx.Users.Add(user);

            await ctx.SaveChangesAsync();

            return new { 
                Message = "Cadastrado com sucesso"
            };
        }

        private async Task<User?> ValidateRefreshTokenAsync(uint userId, string refreshToken)
        {
            var user = await ctx.Users.FindAsync(userId);

            if (user is null || user.RefreshToken != refreshToken || user.RefreshTokenExpiryTime <= DateTime.UtcNow)
            {
                return null;
            }

            return user;
        }

        public async Task<TokenResponseDto?> RefreshTokenAsync(RefreshTokenRequestDto request)
        {
            var user = await ValidateRefreshTokenAsync(request.UserId, request.RefreshToken);

            if (user is null)
                return null;

            TokenResponseDto response = await CreateTokenResponse(user);
            return response;
        }

        private string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }

        private async Task<string> GenerateAndSaveRefreshTokenAsync(User user)
        {
            var rt = GenerateRefreshToken();
            user.RefreshToken = rt;
            user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(2);
            await ctx.SaveChangesAsync();
            return rt;
        }

        private string CreateToken(User user)
        {
            var claims = new List<Claim>
            {
                new("username", user.Username),
                new("id", user.Id.ToString()),
                new("role", user.Role.Name)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration.GetValue<string>("AppSettings:Token")!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);

            var tokenDescriptor = new JwtSecurityToken(
                issuer: configuration.GetValue<string>("AppSettings:Issuer"),
                audience: configuration.GetValue<string>("AppSettings:audience"),
                claims: claims,
                expires: DateTime.UtcNow.AddDays(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
        }

        public async Task<List<Role>> GetRolesAsync()
        {
            return await ctx.Roles.ToListAsync();
        }
    }
}
