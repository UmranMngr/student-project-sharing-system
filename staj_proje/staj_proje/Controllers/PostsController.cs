using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using staj_proje.Data;
using staj_proje.DTOs;
using staj_proje.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace staj_proje.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PostsController : ControllerBase
    {
        private readonly MyDataBaseContext _context;
        private readonly IMapper _mapper;

        public PostsController(MyDataBaseContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PostDTO>>> GetPosts()
        {
            try
            {
                var posts = await _context.Posts
                    .Include(p => p.Comments)
                    .Include(p => p.Likes)
                    .ToListAsync();

                Console.WriteLine("Fetched posts from database successfully.");
                var postsDto = _mapper.Map<IEnumerable<PostDTO>>(posts);
                return Ok(postsDto);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error fetching posts: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, "Error fetching posts.");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PostDTO>> GetPost(int id)
        {
            try
            {
                var post = await _context.Posts
                    .Include(p => p.Comments)
                    .Include(p => p.Likes)
                    .FirstOrDefaultAsync(p => p.Id == id);

                if (post == null)
                {
                    Console.WriteLine($"Post with id {id} not found.");
                    return NotFound();
                }

                Console.WriteLine($"Fetched post with id {id} successfully.");
                return Ok(_mapper.Map<PostDTO>(post));
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error fetching post with id {id}: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, "Error fetching post.");
            }
        }

        private string? SaveImage(IFormFile? image)
        {
            if (image == null || image.Length == 0)
                return null;

            var fileName = Guid.NewGuid() + Path.GetExtension(image.FileName);
            var uploadPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads2");

            if (!Directory.Exists(uploadPath))
            {
                Directory.CreateDirectory(uploadPath);
                Console.WriteLine("Created upload directory.");
            }

            var filePath = Path.Combine(uploadPath, fileName);

            try
            {
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    image.CopyTo(fileStream);
                }
                Console.WriteLine($"Image saved to {filePath}");
                return $"/uploads2/{fileName}";
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error saving image: {ex.Message}");
                return null;
            }
        }

        [HttpPost]
        public async Task<IActionResult> PostPost([FromForm] IFormFile? image, [FromForm] string title, [FromForm] string description, [FromForm] int userId)
        {
            try
            {
                var user = await _context.Users.FindAsync(userId);
                if (user == null)
                {
                    Console.WriteLine($"User with id {userId} does not exist.");
                    return Unauthorized("User does not exist.");
                }

                var imageUrl = SaveImage(image);
                if (string.IsNullOrEmpty(imageUrl))
                {
                    Console.WriteLine("Image saving failed.");
                    return StatusCode(StatusCodes.Status500InternalServerError, "Image saving failed.");
                }

                var post = new Post
                {
                    Title = title,
                    Description = description,
                    ImageUrl = imageUrl,
                    UserId = userId,
                    CreatedAt = DateTime.UtcNow
                };

                _context.Posts.Add(post);
                await _context.SaveChangesAsync();

                Console.WriteLine($"Post created with id {post.Id}");
                return Ok(post);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error creating post: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, "Error creating post.");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePost(int id, [FromForm] IFormFile? image, [FromForm] string title, [FromForm] string description)
        {
            try
            {
                var post = await _context.Posts.FindAsync(id);
                if (post == null)
                {
                    Console.WriteLine($"Post with id {id} not found.");
                    return NotFound();
                }

                if (!string.IsNullOrEmpty(title))
                {
                    post.Title = title;
                }

                if (!string.IsNullOrEmpty(description))
                {
                    post.Description = description;
                }

                if (image != null && image.Length > 0)
                {
                    if (!string.IsNullOrEmpty(post.ImageUrl) && post.ImageUrl != "/uploads2/default_image.png")
                    {
                        var oldImagePath = Path.Combine("wwwroot", "uploads2", Path.GetFileName(post.ImageUrl));
                        if (System.IO.File.Exists(oldImagePath))
                        {
                            System.IO.File.Delete(oldImagePath);
                            Console.WriteLine($"Old image deleted from {oldImagePath}");
                        }
                    }

                    var newImageUrl = SaveImage(image);
                    if (string.IsNullOrEmpty(newImageUrl))
                    {
                        Console.WriteLine("Image saving failed.");
                        return StatusCode(StatusCodes.Status500InternalServerError, "Image saving failed.");
                    }

                    post.ImageUrl = newImageUrl;
                }

                _context.Entry(post).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                Console.WriteLine($"Post with id {id} updated.");
                return NoContent();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error updating post with id {id}: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, "Error updating post.");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePost(int id)
        {
            try
            {
                var post = await _context.Posts.FindAsync(id);
                if (post == null)
                {
                    Console.WriteLine($"Post with id {id} not found.");
                    return NotFound("Post not found.");
                }

                if (!string.IsNullOrEmpty(post.ImageUrl))
                {
                    var imagePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", post.ImageUrl.TrimStart('/'));
                    try
                    {
                        if (System.IO.File.Exists(imagePath))
                        {
                            System.IO.File.Delete(imagePath);
                            Console.WriteLine($"Deleted image at {imagePath}");
                        }
                    }
                    catch (Exception imgEx)
                    {
                        Console.WriteLine($"Error deleting image: {imgEx.Message}");
                    }
                }

                _context.Posts.Remove(post);
                await _context.SaveChangesAsync();

                Console.WriteLine($"Post with id {id} deleted.");
                return NoContent();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error deleting post with id {id}: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while deleting the post.");
            }
        }

        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<PostDTO>>> GetPostsByUser(int userId)
        {
            try
            {
                var posts = await _context.Posts
                    .Where(p => p.UserId == userId)
                    .Include(p => p.Comments)
                    .Include(p => p.Likes)
                    .ToListAsync();

                if (posts == null || !posts.Any())
                {
                    Console.WriteLine($"No posts found for user with id {userId}.");
                    return NotFound("No posts found for this user.");
                }

                Console.WriteLine($"Fetched posts for user with id {userId}.");
                var postsDto = _mapper.Map<IEnumerable<PostDTO>>(posts);
                return Ok(postsDto);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error fetching posts for user with id {userId}: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, "Error fetching posts.");
            }
        }


        [HttpGet("following/{userId}")]
        public async Task<ActionResult<IEnumerable<PostDTO>>> GetPostsByFollowing(int userId)
        {
            try
            {
                var followingUserIds = await _context.UserFollowers
                    .Where(uf => uf.FollowerId == userId)
                    .Select(uf => uf.FollowedId)
                    .ToListAsync();

                var posts = await _context.Posts
                    .Where(p => followingUserIds.Contains(p.UserId))
                    .Include(p => p.Comments)
                    .Include(p => p.Likes)
                    .ToListAsync();

                if (!posts.Any())
                {
                    Console.WriteLine($"No posts found for the users followed by user with id {userId}.");
                    return NotFound("No posts found for followed users.");
                }

                Console.WriteLine($"Fetched posts for followed users by user with id {userId}.");
                var postsDto = _mapper.Map<IEnumerable<PostDTO>>(posts);
                return Ok(postsDto);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error fetching posts for followed users by user with id {userId}: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, "Error fetching posts.");
            }
        }


    }
}
