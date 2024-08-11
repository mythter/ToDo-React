namespace DAL.Repositories.Interfaces
{
    public interface IRepositoryWrapper
    {
        IToDoItemRepository ToDoItemRepository { get; }

        IStatusRepository StatusRepository { get; }

        Task<int> SaveChangesAsync();
    }
}
