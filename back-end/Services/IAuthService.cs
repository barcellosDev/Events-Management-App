using back_end.Dtos;
using back_end.Models;

namespace back_end.Services
{
    public interface IAuthService
    {
        Task<object?> RegisterAsync(RegisterUserDto request);
        Task<TokenResponseDto?> LoginAsync(LoginUserDto request);
        Task<TokenResponseDto?> RefreshTokenAsync(RefreshTokenRequestDto request);
        Task<List<Role>> GetRolesAsync();
    }
}
