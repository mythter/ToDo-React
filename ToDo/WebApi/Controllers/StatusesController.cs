using BLL.DTOs;
using BLL.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StatusesController : ControllerBase
    {
        private readonly IStatusService _statusService;
        public StatusesController(IStatusService statusService)
        {
            _statusService = statusService;
        }

        [HttpGet]
        public async Task<ActionResult<List<StatusDto>>> Get()
        {
            try
            {
                var statuses = await _statusService.GetAll().ToListAsync();
                return Ok(statuses);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<ActionResult<StatusDto>> Add([FromBody] StatusDto status)
        {
            try
            {
                var addedStatus = await _statusService.AddAsync(status);
                return Ok(addedStatus);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<StatusDto>> Delete(int id)
        {
            try
            {
                var deletedStatus = await _statusService.DeleteAsync(id);
                return Ok(deletedStatus);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<StatusDto>> GetById(int id)
        {
            try
            {
                var status = await _statusService.GetByIdAsync(id);
                return Ok(status);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPut]
        public async Task<ActionResult<StatusDto>> Update([FromBody] StatusDto status)
        {
            try
            {
                var updatedStatus = await _statusService.UpdateAsync(status);
                return Ok(updatedStatus);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

    }
}
