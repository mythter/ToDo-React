using AutoMapper;
using BLL.DTOs;
using DAL.Entities;

namespace BLL.Mapping
{
    public class StatusProfile : Profile
    {
        public StatusProfile()
        {
            CreateMap<Status, StatusDto>()
                .ReverseMap();
        }
    }
}
