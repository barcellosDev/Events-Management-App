namespace back_end.Models
{
    public class Category
    {
        public uint Id { get; set; }
        public required string Name { get; set; }
        public ICollection<Event> Events { get; set; } = new List<Event>();
    }
}
