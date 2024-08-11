using DAL.Entities;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace DAL.Repositories.Realizations
{
    public class RepositoryBase<T> : IRepositoryBase<T> where T : BaseEntity
    {
        private readonly DbSet<T> _dbSet;

        public RepositoryBase(ToDoDbContext dbContext)
        {
            _dbSet = dbContext.Set<T>();
        }

        public async Task<T> AddAsync(T entity)
        {
            ArgumentNullException.ThrowIfNull(entity);

            EntityEntry<T> entry = await _dbSet.AddAsync(entity);

            return entry.Entity;
        }

        public async Task<T> DeleteAsync(int id)
        {
            var entity = await GetAsync(id);

            EntityEntry<T> entry = _dbSet.Remove(entity);

            return entry.Entity;
        }

        public IQueryable<T> GetAll(params string[] includeProperties)
        {
            IQueryable<T> query = _dbSet.AsQueryable();

            foreach (var property in includeProperties)
            {
                query = query.Include(property);
            }

            return query;
        }

        public async Task<T> GetAsync(int id, params string[] includeProperties)
        {
            IQueryable<T> query = _dbSet.AsQueryable();

            foreach (var property in includeProperties)
            {
                query = query.Include(property);
            }

            var entity = await query.FirstOrDefaultAsync(e => e.Id == id);

            if (entity == null)
            {
                throw new KeyNotFoundException();
            }

            return entity;
        }

        public T Update(T entity)
        {
            ArgumentNullException.ThrowIfNull(entity);

            EntityEntry<T> entry = _dbSet.Update(entity);

            return entry.Entity;
        }
    }
}
