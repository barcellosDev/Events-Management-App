using back_end.Data;
using back_end.Dtos;
using back_end.Enums;
using back_end.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace back_end.Controllers
{
    [Route("api/events")]
    [ApiController]
    public class EventsController(EventsManagementDbContext context) : ControllerBase
    {
        [HttpGet]
        public async Task<object> GetAllAsync([FromQuery] int pageNumber, [FromQuery] int pageSize)
        {
            var eventsQuery = context.Events.AsQueryable();
            var totalCount = await eventsQuery.CountAsync();

            var events = await eventsQuery
                .OrderBy(e => e.StartTime)
                .Skip((pageNumber-1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return Ok(new
            {
                events,
                totalCount
            });
        }

        [HttpGet("categories")]
        public async Task<List<Category>> getCategories()
        {
            return await context.Categories.ToListAsync();
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<Event>> Get(int id)
        {
            var response = await context.Events.Where(e => e.Id == id).ToArrayAsync();
            var firstEvent = response[0];
            return Ok(firstEvent);
        }

        [HttpGet("mine")]
        [Authorize]
        public async Task<object> GetMyEvents([FromQuery] int pageNumber, [FromQuery] int pageSize)
        {
            var userId = int.Parse(User.FindFirst("id")?.Value);
            var userEventsQuery = context.UsersEvents.AsQueryable();

            var events = userEventsQuery
                .Where(ue => ue.UserId == userId)
                .Select(ue => ue.Event);

            var totalCount = await events.CountAsync();

            var paginatedEvents = await events
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return Ok(new
            {
                events = paginatedEvents,
                totalCount
            });
        }

        [HttpPost]
        [Authorize(Roles="Organizer")]
        public async Task<ActionResult<object>> Create(CreateEventDto request)
        {
            var userId = uint.Parse(User.FindFirst("id")?.Value);

            var eventInstance = new Event { 
                Title = request.Title,
                Description = request.Description,
                Location = request.Location,
                CategoryId = request.CategoryId,
                StartTime = request.StartTime,
                EndTime = request.EndTime
            };

            eventInstance.UserEvents.Add(new UserEvent { EventId = eventInstance.Id, UserId = userId });

            context.Add(eventInstance);
            await context.SaveChangesAsync();

            return Ok(new {Message = "Evento criado" });
        }

    }
}
