using DAL.Entities;
using Microsoft.EntityFrameworkCore;

namespace DAL
{
    public class ToDoDbContext : DbContext
    {
        public ToDoDbContext(DbContextOptions<ToDoDbContext> options) : base(options) { }

        //public ToDoDbContext() { }

        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    optionsBuilder.UseSqlServer(@"Server=(localdb)\mssqllocaldb;Database=ToDoDB;Trusted_Connection=True;");
        //}

        public DbSet<ToDoItem> ToDoItems { get; set; }
        public DbSet<Status> Statuses { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<ToDoItem>()
                .HasOne(i => i.Status)
                .WithMany(s => s.ToDoItems)
                .HasForeignKey(i => i.StatusId);
        }
    }
}
