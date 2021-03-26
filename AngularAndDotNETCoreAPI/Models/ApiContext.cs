using Microsoft.EntityFrameworkCore;

namespace AngularAndDotNETCoreAPI.Models
{
    public class ApiContext : DbContext
    {
        public DbSet<Department> Departments { get; set; }
        public DbSet<Employee> Employees { get; set; }

        public ApiContext(DbContextOptions<ApiContext> options) : base(options) { }
    }
}
