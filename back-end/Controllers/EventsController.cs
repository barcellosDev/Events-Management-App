using back_end.Data;
using back_end.Dtos;
using back_end.Enums;
using back_end.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Security.Claims;

namespace back_end.Controllers
{
    [Route("api/events")]
    [ApiController]
    [Authorize]
    public class EventsController(EventsManagementDbContext context) : ControllerBase
    {
        [HttpGet]
        public async Task<object> GetAllAsync([FromQuery] int pageNumber, [FromQuery] int pageSize, [FromQuery] bool ?myEvents)
        {
            var userId = uint.Parse(User.FindFirst("id")?.Value);
            var eventsQuery = context.Events.AsQueryable();
            var totalCount = await eventsQuery.CountAsync();

            var eventsQ = eventsQuery
                    .OrderBy(e => e.StartTime)
                    .Skip((pageNumber - 1) * pageSize)
                    .Take(pageSize);

            if (myEvents != null)
            {
                eventsQ = eventsQuery
                    .Where(e => e.UserId == userId)
                    .OrderBy(e => e.StartTime)
                    .Skip((pageNumber - 1) * pageSize)
                    .Take(pageSize);
            }

            var eventsQ2 = eventsQ.Select(e => new
            {
                Id = e.Id,
                Title = e.Title,
                StartTime = e.StartTime,
                EndTime = e.EndTime
            });

            var eventsList = await eventsQ2.ToListAsync();

            return Ok(new
            {
                events = eventsList,
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
            var userId = uint.Parse(User.FindFirst("id")?.Value);
            var hasLoggedUserIdRegisteredInEvent = await context
                .UsersEvents
                .Where(ue => ue.UserId == userId && ue.EventId == id)
                .FirstOrDefaultAsync();

            var response = context.Events
                    .Where(e => e.Id == id)
                    .Include(e => e.Category)
                    .Select(e => new
                    {
                        e.Id,
                        e.Title,
                        e.Description,
                        e.Location,
                        e.StartTime,
                        e.EndTime,
                        e.Category,
                        RegisteredUserId = (uint)0
                    });

            if (hasLoggedUserIdRegisteredInEvent != null)
            {
                response = context.Events
                    .Where(e => e.Id == id)
                    .Include(e => e.Category)
                    .Select(e => new
                    {
                        e.Id,
                        e.Title,
                        e.Description,
                        e.Location,
                        e.StartTime,
                        e.EndTime,
                        e.Category,
                        RegisteredUserId = userId
                    });
            }

            var eventInstance = await response.FirstOrDefaultAsync();
            return Ok(eventInstance);
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
                EndTime = request.EndTime,
                UserId = userId
            };

            context.Events.Add(eventInstance);
            await context.SaveChangesAsync();

            return Ok(new {Message = "Evento criado" });
        }

        [HttpPost("{id:int}/register")]
        [Authorize(Roles="Attendee")]
        public async Task<ActionResult<object>> Register(uint id)
        {
            var userId = uint.Parse(User.FindFirst("id")?.Value);
            var userEventInstance = new UserEvent { 
                UserId = userId,
                EventId = id
            };

            context.UsersEvents.Add(userEventInstance);
            await context.SaveChangesAsync();

            return Ok(new
            {
                Message = "Usuario registrado com sucesso"
            });
        }

        [HttpPost("{id:int}/remove-registration")]
        [Authorize(Roles = "Attendee")]
        public async Task<ActionResult<object>> RemoveUserRegistration(uint id)
        {
            var userId = uint.Parse(User.FindFirst("id")?.Value);
            var userEventInstance = new UserEvent
            {
                UserId = userId,
                EventId = id
            };

            context.UsersEvents.Remove(userEventInstance);
            await context.SaveChangesAsync();

            return Ok(new
            {
                Message = "Usuario removido do evento"
            });
        }

        [HttpDelete("{id:int}")]
        [Authorize(Roles="Organizer,Admin")]
        public async Task<ActionResult<object>> Delete(uint id)
        {
            var eventObj = await context.Events.FindAsync(id);

            if (eventObj == null) {
                return Ok(new
                {
                    Message = "Nenhum evento encontrado"
                });
            }

            var pivotRows = await context.UsersEvents
                .Where(ue => ue.EventId == id)
                .ToListAsync();

            context.UsersEvents.RemoveRange(pivotRows);
            context.Events.Remove(eventObj);
            await context.SaveChangesAsync();

            return Ok(new
            {
                Message = "Evento removido"
            });
        }
    }
}
