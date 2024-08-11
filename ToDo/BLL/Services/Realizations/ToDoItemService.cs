using AutoMapper;
using AutoMapper.QueryableExtensions;
using BLL.DTOs;
using BLL.Services.Interfaces;
using DAL.Entities;
using DAL.Repositories.Interfaces;

namespace BLL.Services.Realizations
{
    public class ToDoItemService : IToDoItemService
    {
        private readonly IRepositoryWrapper _repositoryWrapper;
        private readonly IToDoItemRepository _toDoItemRepository;
        private readonly IMapper _mapper;

        public ToDoItemService(IRepositoryWrapper repositoryWrapper, IMapper mapper)
        {
            _repositoryWrapper = repositoryWrapper;
            _toDoItemRepository = repositoryWrapper.ToDoItemRepository;
            _mapper = mapper;
        }

        public async Task<ToDoItemDto> AddAsync(ToDoItemCreateDto model)
        {
            var toDo = _mapper.Map<ToDoItem>(model);

            var entity = await _toDoItemRepository.AddAsync(toDo);

            await _repositoryWrapper.SaveChangesAsync();

            return _mapper.Map<ToDoItemDto>(entity);
        }

        public async Task<ToDoItemDto> DeleteAsync(int id)
        {
            var entity = await _toDoItemRepository.DeleteAsync(id);

            await _repositoryWrapper.SaveChangesAsync();

            return _mapper.Map<ToDoItemDto>(entity);
        }

        public IQueryable<ToDoItemDto> GetAll()
        {
            var entities = _toDoItemRepository.GetAll("Status");
            return entities.ProjectTo<ToDoItemDto>(_mapper.ConfigurationProvider);
        }

        public async Task<ToDoItemDto> GetByIdAsync(int id)
        {
            var entity = await _toDoItemRepository.GetAsync(id, "Status");
            return _mapper.Map<ToDoItemDto>(entity);
        }

        public async Task<ToDoItemDto> UpdateAsync(ToDoItemUpdateDto model)
        {
            var toDo = _mapper.Map<ToDoItem>(model);

            var entity = _toDoItemRepository.Update(toDo);

            await _repositoryWrapper.SaveChangesAsync();

            return _mapper.Map<ToDoItemDto>(entity);
        }
    }
}
