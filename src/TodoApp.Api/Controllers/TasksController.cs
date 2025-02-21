using Microsoft.AspNetCore.Mvc;
using TodoApp.Core.DTOs;
using TodoApp.Core.Interfaces;

namespace TodoApp.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    private readonly ITaskService _taskService;

    public TasksController(ITaskService taskService)
    {
        _taskService = taskService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TaskDto>>> GetRecentTasks()
    {
        var tasks = await _taskService.GetRecentTasksAsync(5);
        return Ok(tasks);
    }

    [HttpPost]
    public async Task<ActionResult<TaskDto>> CreateTask(CreateTaskDto createTaskDto)
    {
        var task = await _taskService.CreateTaskAsync(createTaskDto);
        return CreatedAtAction(nameof(GetRecentTasks), new { id = task.Id }, task);
    }

    [HttpPut("{id}/complete")]
    public async Task<ActionResult> CompleteTask(Guid id)
    {
        await _taskService.CompleteTaskAsync(id);
        return NoContent();
    }
}