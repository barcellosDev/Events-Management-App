using back_end.Data;
using back_end.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace back_end.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController(EventsManagementDbContext context) : ControllerBase
    {
        [HttpGet("{userId:int}/registrations")]
        [Authorize]
        public async Task<ActionResult<List<Event>>> GetEvents(uint userId)
        {
            var events = await context.Events.Where(e => e.UserId == userId).ToListAsync();
            return Ok(events);
        }
    }
}
