using AutoMapper;
using AutoMapper.QueryableExtensions;
using BLL.DTOs;
using BLL.Services.Interfaces;
using DAL.Entities;
using DAL.Repositories.Interfaces;

namespace BLL.Services.Realizations
{
    public class StatusService : IStatusService
    {
        private readonly IRepositoryWrapper _repositoryWrapper;
        private readonly IStatusRepository _statusRepository;
        private readonly IMapper _mapper;

        public StatusService(IRepositoryWrapper repositoryWrapper, IMapper mapper)
        {
            _repositoryWrapper = repositoryWrapper;
            _statusRepository = repositoryWrapper.StatusRepository;
            _mapper = mapper;
        }

        public async Task<StatusDto> AddAsync(StatusDto model)
        {
            var status = _mapper.Map<Status>(model);

            var entity = await _statusRepository.AddAsync(status);

            await _repositoryWrapper.SaveChangesAsync();

            return _mapper.Map<StatusDto>(entity);
        }

        public async Task<StatusDto> DeleteAsync(int id)
        {
            var entity = await _statusRepository.DeleteAsync(id);

            await _repositoryWrapper.SaveChangesAsync();

            return _mapper.Map<StatusDto>(entity);
        }

        public IQueryable<StatusDto> GetAll()
        {
            var entities = _statusRepository.GetAll();
            return entities.ProjectTo<StatusDto>(_mapper.ConfigurationProvider);
        }

        public async Task<StatusDto> GetByIdAsync(int id)
        {
            var entity = await _statusRepository.GetAsync(id);
            return _mapper.Map<StatusDto>(entity);
        }

        public async Task<StatusDto> UpdateAsync(StatusDto model)
        {
            var status = _mapper.Map<Status>(model);

            var entity = _statusRepository.Update(status);

            await _repositoryWrapper.SaveChangesAsync();

            return _mapper.Map<StatusDto>(entity);
        }
    }
}
