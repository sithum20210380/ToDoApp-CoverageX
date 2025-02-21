using System.Collections.Generic;
using System.Threading.Tasks;
using TodoApp.Core.Entities; // ✅ Add this line

namespace TodoApp.Core.Interfaces
{
    public interface ITaskRepository
    {
        Task<IEnumerable<TodoTask>> GetRecentTasksAsync(int count);
        Task<TodoTask> CreateTaskAsync(TodoTask task);
        Task<TodoTask> GetTaskByIdAsync(Guid id);
        Task UpdateTaskAsync(TodoTask task);
    }
}
