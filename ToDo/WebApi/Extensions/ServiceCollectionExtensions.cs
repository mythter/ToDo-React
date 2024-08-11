using BLL.Mapping;
using BLL.Services.Interfaces;
using BLL.Services.Realizations;
using DAL.Repositories.Interfaces;
using DAL.Repositories.Realizations;
using DAL;
using Microsoft.EntityFrameworkCore;

namespace WebApi.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddDataAccessLayer(this IServiceCollection services, IConfiguration config)
        {
            string? connectionString = config.GetConnectionString("DefaultConnection");

            services.AddDbContext<ToDoDbContext>(optionsBuidler =>
            {
                optionsBuidler.UseSqlServer(connectionString);
            });

            services.AddScoped<IRepositoryWrapper, RepositoryWrapper>();

            return services;
        }

        public static IServiceCollection AddBusinessLogicLayer(this IServiceCollection services)
        {
            services.AddAutoMapper(cfg =>
            {
                cfg.AddProfile<ToDoItemProfile>();
                cfg.AddProfile<StatusProfile>();
            });

            services.AddScoped<IStatusService, StatusService>();
            services.AddScoped<IToDoItemService, ToDoItemService>();

            return services;
        }


    }
}
