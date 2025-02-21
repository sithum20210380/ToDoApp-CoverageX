using TodoApp.Core.Interfaces;
using TodoApp.Core.Entities;
using TodoApp.Core.DTOs;
using TodoApp.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace TodoApp.Infrastructure.Services
{
    public class TaskService : ITaskService
    {
        private readonly TodoDbContext _context;

        public TaskService(TodoDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<TaskDto>> GetRecentTasksAsync(int count)
        {
            var tasks = await _context.Tasks
                .OrderByDescending(t => t.CreatedAt)
                .Take(count)
                .ToListAsync();

            return tasks.Select(t => new TaskDto
            {
                Id = t.Id,
                Title = t.Title,
                Description = t.Description,
                IsCompleted = t.IsCompleted,
                CreatedAt = t.CreatedAt,
                CompletedAt = t.CompletedAt
            });
        }

        public async Task<TaskDto> CreateTaskAsync(CreateTaskDto createTaskDto)
        {
            var task = new TodoTask  // Use TodoTask instead of Task
            {
                Id = Guid.NewGuid(),
                Title = createTaskDto.Title,
                Description = createTaskDto.Description,
                IsCompleted = false,
                CreatedAt = DateTime.UtcNow
            };

            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            return new TaskDto
            {
                Id = task.Id,
                Title = task.Title,
                Description = task.Description,
                IsCompleted = task.IsCompleted,
                CreatedAt = task.CreatedAt,
                CompletedAt = task.CompletedAt
            };
        }

        public async Task CompleteTaskAsync(Guid id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null) return;

            task.IsCompleted = true;
            task.CompletedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<TaskDto>> GetAllTasksAsync()
        {
            var tasks = await _context.Tasks.ToListAsync();
            return tasks.Select(t => new TaskDto
            {
                Id = t.Id,
                Title = t.Title,
                Description = t.Description,
                IsCompleted = t.IsCompleted,
                CreatedAt = t.CreatedAt,
                CompletedAt = t.CompletedAt
            });
        }

        public async Task<TaskDto?> GetTaskByIdAsync(Guid id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null) return null;

            return new TaskDto
            {
                Id = task.Id,
                Title = task.Title,
                Description = task.Description,
                IsCompleted = task.IsCompleted,
                CreatedAt = task.CreatedAt,
                CompletedAt = task.CompletedAt
            };
        }

        public async Task<TaskDto?> UpdateTaskAsync(TaskDto taskDto)
        {
            var task = await _context.Tasks.FindAsync(taskDto.Id);
            if (task == null) return null;

            task.Title = taskDto.Title;
            task.Description = taskDto.Description;
            task.IsCompleted = taskDto.IsCompleted;

            await _context.SaveChangesAsync();

            return taskDto;
        }

        public async Task<bool> DeleteTaskAsync(Guid id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null) return false;

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
