namespace BLL.DTOs
{
    public class ToDoItemUpdateDto
    {
        public int Id { get; set; }
        public int StatusId { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
    }
}
