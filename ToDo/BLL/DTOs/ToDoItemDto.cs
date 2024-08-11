namespace BLL.DTOs
{
    public class ToDoItemDto
    {
        public int Id { get; set; }
        public int StatusId { get; set; }
        public string StatusName { get; set; } = default!;
        public string Title { get; set; } = default!;
        public string? Description { get; set; }
    }
}
