namespace back_end.Dtos
{
    public class RegisterUserDto
    {
        public required string Username { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }
        public uint RoleId { get; set; }
    }
}
