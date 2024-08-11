namespace BLL.Services.Interfaces
{
    public interface ICrud<T>
    {
        IQueryable<T> GetAll();
        Task<T> GetByIdAsync(int id);
        Task<T> AddAsync(T model);
        Task<T> UpdateAsync(T model);
        Task<T> DeleteAsync(int id);
    }
}
