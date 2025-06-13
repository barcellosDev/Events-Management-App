namespace back_end.Models
{
    public class User
    {
        public uint Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;

        public required Role Role { get; set; }
        public uint RoleId { get; set; }
        public string? RefreshToken { get; set; }
        public DateTime? RefreshTokenExpiryTime { get; set; }

        public ICollection<UserEvent> UserEvents { get; set; } = new List<UserEvent>();
    }
}
