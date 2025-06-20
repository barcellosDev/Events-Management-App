namespace back_end.Models
{
    public class UserEvent
    {
        public uint Id { get; set; }
        public required uint UserId { get; set; }
        public User ?User { get; set; }
        public required uint EventId { get; set; }
        public Event ?Event { get; set; }
        public DateTime RegisteredAt { get; set; } = DateTime.UtcNow;
    }
}
