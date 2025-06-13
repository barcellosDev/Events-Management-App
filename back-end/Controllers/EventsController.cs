using back_end.Data;
using back_end.Enums;
using back_end.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace back_end.Controllers
{
    [Route("api/events")]
    [ApiController]
    public class EventsController(EventsManagementDbContext context) : ControllerBase
    {
        [HttpGet]
        public async Task<List<Event>> GetAll()
        {
            var eventsQuery = context.Events.AsQueryable();
            return await eventsQuery.ToListAsync();
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<Event>> Get(int id)
        {
            var response = await context.Events.Where(e => e.Id == id).ToArrayAsync();
            var firstEvent = response[0];
            return Ok(firstEvent);
        }

        [HttpPost]
        public async Task<ActionResult<object>> Create()
        {
            return new {};
        }

    }
}
