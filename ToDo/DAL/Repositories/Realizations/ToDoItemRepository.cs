using DAL.Entities;
using DAL.Repositories.Interfaces;

namespace DAL.Repositories.Realizations
{
    public class ToDoItemRepository : RepositoryBase<ToDoItem>, IToDoItemRepository
    {
        public ToDoItemRepository(ToDoDbContext dbContext) : base(dbContext) { }
    }
}
