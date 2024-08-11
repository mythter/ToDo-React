using AutoMapper;
using BLL.DTOs;
using DAL.Entities;
using System.Numerics;

namespace BLL.Mapping
{
    public class ToDoItemProfile : Profile
    {
        public ToDoItemProfile()
        {
            CreateMap<ToDoItem, ToDoItemDto>()
                .ForMember(
                dto => dto.StatusName,
                x => x.MapFrom(i => i.Status.Name)
                )
                .ReverseMap();

            CreateMap<ToDoItem, ToDoItemCreateDto>()
                .ReverseMap();

            CreateMap<ToDoItem, ToDoItemUpdateDto>()
               .ReverseMap();
        }
    }
}
