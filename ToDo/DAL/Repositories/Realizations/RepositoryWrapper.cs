using DAL.Repositories.Interfaces;

namespace DAL.Repositories.Realizations
{
    public class RepositoryWrapper : IRepositoryWrapper
    {
        private readonly ToDoDbContext _dbContext; // DB context implement IDisposable
                                                   // as a result RepositoryWrapper should implement IDisposable

        private IToDoItemRepository _toDoItemRepository = null!;

        private IStatusRepository _statusRepository = null!;

        public RepositoryWrapper(ToDoDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IToDoItemRepository ToDoItemRepository
        {
            get
            {
                if (_toDoItemRepository == null)
                {
                    _toDoItemRepository = new ToDoItemRepository(_dbContext);
                }

                return _toDoItemRepository;
            }
        }
        public IStatusRepository StatusRepository
        {
            get
            {
                if (_statusRepository == null)
                {
                    _statusRepository = new StatusRepository(_dbContext);
                }

                return _statusRepository;
            }
        }

        public async Task<int> SaveChangesAsync()
        {
            return await _dbContext.SaveChangesAsync();
        }
    }
}
