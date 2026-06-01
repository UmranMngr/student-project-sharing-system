using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using staj_proje.Data;
using staj_proje.DTOs;
using staj_proje.Models;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace staj_proje.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly MyDataBaseContext _context;
        private readonly IMapper _mapper;
        private readonly ILogger<UsersController> _logger;

        public UsersController(MyDataBaseContext context, IMapper mapper, ILogger<UsersController> logger)
        {
            _context = context;
            _mapper = mapper;
            _logger = logger;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromForm] UserUpdateDTO userUpdateDto)
        {
            if (userUpdateDto == null)
            {
                _logger.LogWarning("Güncellenmek istenen kullanıcı bilgileri sağlanmamış."); // Uyarı mesajı logla
                return BadRequest("Kullanıcı bilgileri sağlanmalı.");
            }

            if (id != userUpdateDto.Id)
            {
                var errorMessage = $"Kullanıcı ID'si uyuşmuyor. URL ID: {id}, DTO ID: {userUpdateDto.Id}";
                _logger.LogWarning(errorMessage); 
                return BadRequest(errorMessage);
            }

            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                _logger.LogWarning("Kullanıcı bulunamadı."); 
                return NotFound("Kullanıcı bulunamadı.");
            }

            user.Username = userUpdateDto.Username;
            user.Bio = userUpdateDto.Bio;

            if (userUpdateDto.ProfileImage != null)
            {
                if (!string.IsNullOrEmpty(user.ProfilePictureUrl) && user.ProfilePictureUrl != "/pictures/avatar.png")
                {
                    var oldProfileImagePath = Path.Combine("wwwroot", "uploads", Path.GetFileName(user.ProfilePictureUrl));
                    if (System.IO.File.Exists(oldProfileImagePath))
                    {
                        System.IO.File.Delete(oldProfileImagePath);
                    }
                }

                var uploadsFolder = Path.Combine("wwwroot", "uploads");
                var uniqueFileName = $"{Guid.NewGuid()}_{userUpdateDto.ProfileImage.FileName}";
                var filePath = Path.Combine(uploadsFolder, uniqueFileName);

                Directory.CreateDirectory(uploadsFolder);

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await userUpdateDto.ProfileImage.CopyToAsync(fileStream);
                }

                user.ProfilePictureUrl = $"/uploads/{uniqueFileName}";
            }
            else
            {
                user.ProfilePictureUrl = user.ProfilePictureUrl;
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    _logger.LogWarning("Kullanıcı bulunamadı."); 
                    return NotFound("Kullanıcı bulunamadı.");
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDTO>>> GetUsers()
        {
            var users = await _context.Users
                .Include(u => u.Posts)
                    .ThenInclude(p => p.Comments)
                .Include(u => u.Posts)
                    .ThenInclude(p => p.Likes)
                .ToListAsync();

            var userDtos = _mapper.Map<IEnumerable<UserDTO>>(users);
            return Ok(userDtos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserDTO>> GetUser(int id)
        {
            var user = await _context.Users
                .Include(u => u.Posts)
                    .ThenInclude(p => p.Comments)
                .Include(u => u.Posts)
                    .ThenInclude(p => p.Likes)
                .FirstOrDefaultAsync(u => u.Id == id);

            if (user == null)
            {
                _logger.LogWarning("Kullanıcı bulunamadı.");
                return NotFound("Kullanıcı bulunamadı.");
            }

            var userDto = _mapper.Map<UserDTO>(user);
            return Ok(userDto);
        }

        [HttpPost]
        public async Task<ActionResult<UserDTO>> PostUser(User user)
        {
            if (user == null)
            {
                _logger.LogWarning("Kullanıcı bilgileri sağlanmamış.");
                return BadRequest("Kullanıcı bilgileri sağlanmalı.");
            }

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            var userDto = _mapper.Map<UserDTO>(user);
            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, userDto);
        }

        [HttpPost("{postId}/like")]
        public async Task<ActionResult> LikePost(int postId)
        {
            var userId = GetCurrentUserId();

            var like = new Like
            {
                UserId = userId,
                PostId = postId
            };

            _context.Likes.Add(like);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpGet("{postId}/likes")]
        public async Task<ActionResult<IEnumerable<UserDTO>>> GetPostLikes(int postId)
        {
            var likes = await _context.Likes
                .Where(l => l.PostId == postId)
                .Include(l => l.User)
                .ToListAsync();

            if (!likes.Any())
            {
                _logger.LogWarning("Beğeni bulunamadı."); 
                return NotFound("Beğeni bulunamadı.");
            }

            var userDtos = _mapper.Map<IEnumerable<UserDTO>>(likes.Select(l => l.User));
            return Ok(userDtos);
        }

        private int GetCurrentUserId()
        {
            var userIdString = User?.Identity?.Name;

            if (string.IsNullOrEmpty(userIdString) || !int.TryParse(userIdString, out int userId))
            {
                _logger.LogWarning("Geçerli kullanıcı ID'si bulunamadı."); 
                throw new InvalidOperationException("Geçerli kullanıcı ID'si bulunamadı.");
            }

            return userId;
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }

        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<UserDTO>>> SearchUsers([FromQuery] string query)
        {
            _logger.LogInformation("Arama sorgusu alındı: {Query}", query); 

            if (string.IsNullOrEmpty(query))
            {
                _logger.LogWarning("Arama sorgusu boş veya geçersiz.");
                return BadRequest("Query is required");
            }

            var users = await _context.Users
                .Where(u => u.Username != null && EF.Functions.Like(u.Username, $"%{query}%"))
                .ToListAsync();

            _logger.LogInformation("Bulunan kullanıcı sayısı: {Count}", users.Count); 

            if (!users.Any())
            {
                _logger.LogWarning("Kullanıcı bulunamadı."); 
                return NotFound("Kullanıcı bulunamadı.");
            }

            var userDtos = _mapper.Map<IEnumerable<UserDTO>>(users);
            return Ok(userDtos);
        }




    }
}
