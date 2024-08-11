using BLL.DTOs;
using BLL.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ToDoItemsController : ControllerBase
    {
        private readonly IToDoItemService _toDoItemService;
        public ToDoItemsController(IToDoItemService toDoItemService)
        {
            _toDoItemService = toDoItemService;
        }

        [HttpGet]
        public async Task<ActionResult<List<ToDoItemDto>>> Get()
        {
            try
            {
                var toDos = await _toDoItemService.GetAll().ToListAsync();
                return Ok(toDos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<ActionResult<ToDoItemDto>> Add([FromBody] ToDoItemCreateDto toDo)
        {
            try
            {
                var addedToDo = await _toDoItemService.AddAsync(toDo);
                return Ok(addedToDo);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<ToDoItemDto>> Delete(int id)
        {
            try
            {
                var deletedToDo = await _toDoItemService.DeleteAsync(id);
                return Ok(deletedToDo);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ToDoItemDto>> GetById(int id)
        {
            try
            {
                var status = await _toDoItemService.GetByIdAsync(id);
                return Ok(status);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPut]
        public async Task<ActionResult<ToDoItemDto>> Update([FromBody] ToDoItemUpdateDto toDo)
        {
            try
            {
                var updatedToDo = await _toDoItemService.UpdateAsync(toDo);
                return Ok(updatedToDo);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

    }
}
