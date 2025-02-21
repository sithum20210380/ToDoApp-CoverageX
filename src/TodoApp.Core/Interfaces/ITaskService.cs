namespace TodoApp.Core.Interfaces;
using TodoApp.Core.DTOs;    

public interface ITaskService
{
    Task<IEnumerable<TaskDto>> GetRecentTasksAsync(int count);
    Task<TaskDto> CreateTaskAsync(CreateTaskDto createTaskDto);
    Task CompleteTaskAsync(Guid id);
}