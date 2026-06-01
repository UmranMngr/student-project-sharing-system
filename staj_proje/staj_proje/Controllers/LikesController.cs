using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using staj_proje.Data;
using staj_proje.Models;
using staj_proje.DTOs;

namespace staj_proje.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LikesController : ControllerBase
    {
        private readonly MyDataBaseContext _context;

        public LikesController(MyDataBaseContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<LikeDTO>>> GetLikes()
        {
            var likes = await _context.Likes
                .Include(l => l.Post)
                .Include(l => l.User)
                .Select(l => new LikeDTO
                {
                    Id = l.Id,
                    PostId = l.PostId,
                    UserId = l.UserId
                })
                .ToListAsync();

            return Ok(likes);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<LikeDTO>> GetLike(int id)
        {
            var like = await _context.Likes
                .Include(l => l.Post)
                .Include(l => l.User)
                .Where(l => l.Id == id)
                .Select(l => new LikeDTO
                {
                    Id = l.Id,
                    PostId = l.PostId,
                    UserId = l.UserId
                })
                .FirstOrDefaultAsync();

            if (like == null)
            {
                return NotFound();
            }

            return Ok(like);
        }

        [HttpGet("post/{postId}")]
        public async Task<ActionResult<IEnumerable<LikeDTO>>> GetLikesForPost(int postId)
        {
            var likes = await _context.Likes
                .Where(l => l.PostId == postId)
                .Include(l => l.User)
                .Select(l => new LikeDTO
                {
                    Id = l.Id,
                    PostId = l.PostId,
                    UserId = l.UserId
                })
                .ToListAsync();

            if (likes == null || !likes.Any())
            {
                return NotFound();
            }

            return Ok(likes);
        }

        [HttpPost]
        public async Task<ActionResult<LikeDTO>> PostLike(LikeDTO likeDto)
        {
            // Beğeni var mı kontrol et
            var existingLike = await _context.Likes
                .FirstOrDefaultAsync(l => l.UserId == likeDto.UserId && l.PostId == likeDto.PostId);

            if (existingLike != null)
            {
                return Conflict(new { message = "Bu kullanıcı bu postu zaten beğendi." });
            }

            var like = new Like
            {
                PostId = likeDto.PostId,
                UserId = likeDto.UserId
            };

            _context.Likes.Add(like);
            await _context.SaveChangesAsync();

            var postOwnerId = await _context.Posts
                .Where(p => p.Id == like.PostId)
                .Select(p => p.UserId)
                .FirstOrDefaultAsync();

            if (postOwnerId != like.UserId)
            {
                var likingUser = await _context.Users
                    .Where(u => u.Id == like.UserId)
                    .Select(u => u.Username) 
                    .FirstOrDefaultAsync();

                var notification = new Notification
                {
                    UserId = postOwnerId,
                    Message = $"{likingUser} liked your post.",
                    IsRead = false,
                    CreatedAt = DateTime.UtcNow
                };

                _context.Notifications.Add(notification);
                await _context.SaveChangesAsync();
            }

            var post = await _context.Posts.FindAsync(like.PostId);
            if (post != null)
            {
                post.LikeCount = await _context.Likes.CountAsync(l => l.PostId == like.PostId);
                await _context.SaveChangesAsync();
            }

            likeDto.Id = like.Id;

            return CreatedAtAction("GetLike", new { id = like.Id }, likeDto);
        }




        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLike(int id)
        {
            var like = await _context.Likes.FindAsync(id);

            if (like == null)
            {
                return NotFound();
            }

            _context.Likes.Remove(like);
            await _context.SaveChangesAsync();

            var post = await _context.Posts.FindAsync(like.PostId);

            if (post != null)
            {
                post.LikeCount = await _context.Likes.CountAsync(l => l.PostId == like.PostId);
                await _context.SaveChangesAsync();
            }

            return NoContent();
        }
    }
}
