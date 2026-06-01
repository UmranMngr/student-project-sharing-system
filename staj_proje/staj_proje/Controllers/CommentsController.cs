using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using staj_proje.Data;
using staj_proje.Models;
using staj_proje.DTOs;

namespace staj_proje.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CommentsController : ControllerBase
    {
        private readonly MyDataBaseContext _context;

        public CommentsController(MyDataBaseContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CommentDTO>>> GetComments(int? postId = null)
        {
            var query = _context.Comments.AsQueryable();

            if (postId.HasValue)
            {
                query = query.Where(c => c.PostId == postId.Value);
            }

            var comments = await query
                .Include(c => c.User) 
                .Select(c => new CommentDTO
                {
                    Id = c.Id,
                    Text = c.Text ?? string.Empty,
                    UserId = c.UserId,
                    UserName = c.User != null ? c.User.Username : "Unknown", 
                    PostId = c.PostId,
                    CreatedAt = c.CreatedAt
                })
                .ToListAsync();

            return Ok(comments);
        }



        [HttpGet("{id}")]
        public async Task<ActionResult<CommentDTO>> GetComment(int id)
        {
            var comment = await _context.Comments
                .Include(c => c.Post)
                .Include(c => c.User)
                .Where(c => c.Id == id)
                .Select(c => new CommentDTO
                {
                    Id = c.Id,
                    Text = c.Text ?? string.Empty,
                    UserId = c.UserId,
                    PostId = c.PostId
                })
                .FirstOrDefaultAsync();

            if (comment == null)
            {
                return NotFound();
            }

            return Ok(comment);
        }

        [HttpPost]
        public async Task<ActionResult<CommentDTO>> PostComment([FromForm] string text, [FromForm] int userId, [FromForm] int postId)
        {
            if (string.IsNullOrEmpty(text))
            {
                return BadRequest("Comment text cannot be null or empty");
            }

            var comment = new Comment
            {
                Text = text,
                UserId = userId,
                PostId = postId,
                CreatedAt = DateTime.UtcNow
            };

            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();

            var savedCommentDto = new CommentDTO
            {
                Id = comment.Id,
                Text = comment.Text,
                UserId = comment.UserId,
                PostId = comment.PostId,
                CreatedAt = comment.CreatedAt
            };

            return CreatedAtAction(nameof(GetComment), new { id = comment.Id }, savedCommentDto);
        }


    }
}