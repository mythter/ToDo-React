using DAL.Entities;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace DAL.Repositories.Interfaces
{
    public interface IRepositoryBase<T> where T : BaseEntity
    {
        IQueryable<T> GetAll(params string[] includeProperties);

        Task<T> GetAsync(int id, params string[] includeProperties);

        Task<T> AddAsync(T entity);

        T Update(T entity);

        Task<T> DeleteAsync(int id);
    }
}
