using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using TodoApp.Infrastructure.Data;

namespace TodoApp.Infrastructure;

public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<TodoDbContext>
{
    public TodoDbContext CreateDbContext(string[] args)
    {
        IConfigurationRoot configuration = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json")
            .AddJsonFile("appsettings.Development.json", optional: true)
            .Build();

        var builder = new DbContextOptionsBuilder<TodoDbContext>();
        var connectionString = configuration.GetConnectionString("DefaultConnection");

        builder.UseMySql(connectionString, 
            ServerVersion.AutoDetect(connectionString),
            b => b.MigrationsAssembly("TodoApp.Infrastructure"));

        return new TodoDbContext(builder.Options);
    }
}