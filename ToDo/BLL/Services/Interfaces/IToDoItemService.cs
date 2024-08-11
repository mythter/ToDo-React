using BLL.DTOs;

namespace BLL.Services.Interfaces
{
    public interface IToDoItemService
    {
        IQueryable<ToDoItemDto> GetAll();
        Task<ToDoItemDto> GetByIdAsync(int id);
        Task<ToDoItemDto> AddAsync(ToDoItemCreateDto model);
        Task<ToDoItemDto> UpdateAsync(ToDoItemUpdateDto model);
        Task<ToDoItemDto> DeleteAsync(int id);
    }
}
