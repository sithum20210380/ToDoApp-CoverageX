namespace TodoApp.Core.Entities;

public class Task
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public bool IsCompleted { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? CompletedAt { get; set; }
}

// Create src/TodoApp.Core/Interfaces/ITaskRepository.cs
namespace TodoApp.Core.Interfaces;

public interface ITaskRepository
{
    Task<IEnumerable<Task>> GetRecentTasksAsync(int count);
    Task<Task> CreateTaskAsync(Task task);
    Task<Task> GetTaskByIdAsync(Guid id);
    Task UpdateTaskAsync(Task task);
}

// Create src/TodoApp.Core/Interfaces/ITaskService.cs
namespace TodoApp.Core.Interfaces;

public interface ITaskService
{
    Task<IEnumerable<TaskDto>> GetRecentTasksAsync(int count);
    Task<TaskDto> CreateTaskAsync(CreateTaskDto createTaskDto);
    Task CompleteTaskAsync(Guid id);
}