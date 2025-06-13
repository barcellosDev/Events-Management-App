namespace back_end.Dtos
{
    public class RefreshTokenRequestDto
    {
        public uint UserId { get; set; }
        public required string RefreshToken { get; set; }
    }
}
