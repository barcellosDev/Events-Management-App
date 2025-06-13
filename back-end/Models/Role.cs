namespace back_end.Models
{
    public class Role
    {
        public uint Id { get; set; }
        public required string Name { get; set; }
        public ICollection<User> ?Users { get; set; }
    }
}
