namespace BLL.DTOs
{
    public class ToDoItemCreateDto
    {
        public int StatusId { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
    }
}
