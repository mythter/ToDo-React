using System.ComponentModel.DataAnnotations;

namespace DAL.Entities
{
    public class ToDoItem : BaseEntity
    {
        [Required]
        public int StatusId { get; set; }

        [Required]
        [MaxLength(100)]
        public string Title { get; set; } = default!;

        [MaxLength(3000)]
        public string? Description { get; set; }


        public Status? Status { get; set; }
    }
}
