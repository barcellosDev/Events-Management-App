namespace back_end.Models
{
    public class Event
    {
        public uint Id { get; set; }
        public required string Title { get; set; }
        public required string Description { get; set; }
        public required string Location { get; set; }
        public required DateTime StartTime { get; set; } = DateTime.UtcNow;
        public required DateTime EndTime { get; set; } = DateTime.UtcNow;
        public required uint CategoryId { get; set; }
        public Category ?Category { get; set; }
        public ICollection<UserEvent> UserEvents { get; set; } = new List<UserEvent>();
    }
}
