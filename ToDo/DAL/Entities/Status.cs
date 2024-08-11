using System.ComponentModel.DataAnnotations;

namespace DAL.Entities
{
    public class Status : BaseEntity
    {
        [Required]
        public string Name { get; set; } = default!;

        public List<ToDoItem> ToDoItems { get; set; } = new();
    }
}
