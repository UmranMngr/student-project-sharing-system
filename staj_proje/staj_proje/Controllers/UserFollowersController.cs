using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using staj_proje.Data;
using staj_proje.Models;
using staj_proje.DTOs;

namespace staj_proje.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserFollowersController : ControllerBase
    {
        private readonly MyDataBaseContext _context;

        public UserFollowersController(MyDataBaseContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserFollower>>> GetUserFollowers()
        {
            return await _context.UserFollowers
                .Include(uf => uf.Follower)
                .Include(uf => uf.Followed)
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserFollower>> GetUserFollower(int id)
        {
            var userFollower = await _context.UserFollowers
                .Include(uf => uf.Follower)
                .Include(uf => uf.Followed)
                .FirstOrDefaultAsync(uf => uf.Id == id);

            if (userFollower == null)
            {
                return NotFound();
            }

            return userFollower;
        }

        [HttpGet("check")]
        public async Task<ActionResult<FollowCheckResponse>> CheckFollowStatus([FromQuery] int followedId, [FromQuery] int userId)
        {
            if (userId == followedId)
            {
                return BadRequest("Cannot follow yourself.");
            }

            var isFollowing = await _context.UserFollowers
                .AnyAsync(uf => uf.FollowerId == userId && uf.FollowedId == followedId);

            return Ok(new FollowCheckResponse { IsFollowing = isFollowing });
        }


        [HttpPost]
        public async Task<ActionResult<UserFollower>> PostUserFollower(UserFollower userFollower)
        {
            var userId = GetCurrentUserId();

            if (userId == userFollower.FollowedId)
            {
                return BadRequest("Cannot follow yourself.");
            }

            var existingFollow = await _context.UserFollowers
                .AnyAsync(uf => uf.FollowerId == userFollower.FollowerId && uf.FollowedId == userFollower.FollowedId);

            if (existingFollow)
            {
                return Conflict("Already following this user.");
            }

            _context.UserFollowers.Add(userFollower);
            await _context.SaveChangesAsync();

            var followerUserName = await _context.Users
                .Where(u => u.Id == userFollower.FollowerId)
                .Select(u => u.Username) 
                .FirstOrDefaultAsync();

            var notification = new Notification
            {
                UserId = userFollower.FollowedId,
                Message = $"{followerUserName} is now following you.",
                IsRead = false,
                CreatedAt = DateTime.UtcNow
            };

            _context.Notifications.Add(notification);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUserFollower", new { id = userFollower.Id }, userFollower);
        }


        [HttpDelete]
        public async Task<IActionResult> UnfollowUser([FromQuery] int followedId, [FromQuery] int userId)
        {
            if (userId == followedId)
            {
                return BadRequest("Cannot unfollow yourself.");
            }

            var userFollower = await _context.UserFollowers
                .FirstOrDefaultAsync(uf => uf.FollowerId == userId && uf.FollowedId == followedId);

            if (userFollower == null)
            {
                return NotFound("Follow relation not found.");
            }

            _context.UserFollowers.Remove(userFollower);
            await _context.SaveChangesAsync();

            return NoContent();
        }


        [HttpGet("notifications/{userId}")]
        public async Task<ActionResult<IEnumerable<Notification>>> GetNotifications(int userId)
        {
            var notifications = await _context.Notifications
                .Where(n => n.UserId == userId && !n.IsRead)
                .OrderByDescending(n => n.CreatedAt)
                .ToListAsync();

            return Ok(notifications);
        }



        private int GetCurrentUserId()
        {
            return 1; 
        }
    }
}
