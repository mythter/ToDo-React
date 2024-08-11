using System.ComponentModel.DataAnnotations;

namespace DAL.Entities
{
    public class BaseEntity //<TKey>
    {
        [Key]
        public int Id { get; set; }
    }
}
