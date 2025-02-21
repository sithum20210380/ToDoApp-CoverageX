using TodoApp.Infrastructure.Data;
using TodoApp.Core.Interfaces;
using TodoApp.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace TodoApp.Infrastructure.Repositories
{
    public class TaskRepository : ITaskRepository
{
    private readonly TodoDbContext _context;

    public TaskRepository(TodoDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<TodoTask>> GetRecentTasksAsync(int count)
    {
        return await _context.Tasks
                             .OrderByDescending(t => t.CreatedAt)
                             .Take(count)
                             .ToListAsync();
    }

    public async Task<TodoTask> CreateTaskAsync(TodoTask task)
    {
        _context.Tasks.Add(task);
        await _context.SaveChangesAsync();
        return task;
    }

    public async Task<TodoTask> GetTaskByIdAsync(Guid id)
    {
        return await _context.Tasks.FindAsync(id);
    }

    public async Task UpdateTaskAsync(TodoTask task)
    {
        _context.Tasks.Update(task);
        await _context.SaveChangesAsync();
    }
}
}


