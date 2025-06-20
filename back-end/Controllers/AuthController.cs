using back_end.Dtos;
using back_end.Models;
using back_end.Services;
using Microsoft.AspNetCore.Mvc;

namespace back_end.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController(IAuthService _authService) : ControllerBase
    {
        [HttpPost("register")]
        public async Task<ActionResult> Register(RegisterUserDto request)
        {
            try
            {
                var response = await _authService.RegisterAsync(request);
                return Ok(response);
            }
            catch (Exception e)
            {
                return BadRequest(new { e.Message });
            }
        }

        [HttpGet("register")]
        public async Task<List<Role>> GetRoles()
        {
            return await _authService.GetRolesAsync();
        }

        [HttpPost("login")]
        public async Task<ActionResult<TokenResponseDto?>> Login(LoginUserDto request) {

            try
            {
                var response = await _authService.LoginAsync(request);
                return Ok(response);
            }
            catch (Exception e)
            {
                return BadRequest(new { e.Message });
            }
        }

        [HttpPost("refresh-token")]
        public async Task<ActionResult<TokenResponseDto>> RefreshToken(RefreshTokenRequestDto request)
        {
            var response = await _authService.RefreshTokenAsync(request);

            if (response is null || response.AccessToken is null ||  response.RefreshToken is null)
            {
                return Unauthorized("INVALID REFRESH TOKEN");
            }

            return Ok(response);
        }
    }
}
