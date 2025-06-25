using back_end.Data;
using back_end.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace back_end.Controllers
{
    [Route("api/users")]
    [ApiController]
    [Authorize]
    public class UserController(EventsManagementDbContext context) : ControllerBase
    {
        [HttpGet("{userId:int}/registrations")]
        public async Task<ActionResult<List<Event>>> GetEvents(uint userId, [FromQuery] int pageNumber, [FromQuery] int pageSize)
        {
            var eventsQ = context.UsersEvents.AsQueryable();
            var totalCount = await eventsQ.CountAsync();

            var eventsList = await eventsQ
                .Where(ue =>  ue.UserId == userId)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .Include(ue => ue.Event)
                .Select(ue => new
                {
                    Id = ue.Event.Id,
                    Title = ue.Event.Title,
                    StartTime = ue.Event.StartTime,
                    EndTime = ue.Event.EndTime,
                })
                .ToListAsync();

            return Ok(new
            {
                events = eventsList,
                totalCount
            });
        }
    }
}
