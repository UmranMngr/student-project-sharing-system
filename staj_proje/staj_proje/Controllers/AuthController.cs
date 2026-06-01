using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using staj_proje.Data;
using staj_proje.Models;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace staj_proje.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly MyDataBaseContext _context;
        private readonly TokenService _tokenService;

        public AuthController(MyDataBaseContext context, TokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            if (await _context.Users.AnyAsync(u => u.Email == model.Email))
            {
                return BadRequest("Bu e-posta adresi zaten kayıtlı.");
            }

            using var hmac = new HMACSHA512();
            var user = new User
            {
                Username = model.Username,
                Email = model.Email,
                PasswordHash = Convert.ToBase64String(hmac.ComputeHash(Encoding.UTF8.GetBytes(model.Password))),
                ProfilePictureUrl = model.ProfilePictureUrl,
                PasswordSalt = Convert.ToBase64String(hmac.Key)
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            var defaultPost = new Post
            {
                UserId = user.Id,
                Description = "Varsayılan gönderi",
                LikeCount = 0
            };
            _context.Posts.Add(defaultPost);
            await _context.SaveChangesAsync();

            return Ok("Kayıt başarılı.");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Email == model.Email);
            if (user == null)
            {
                return Unauthorized("Geçersiz e-posta veya şifre.");
            }

            if (string.IsNullOrEmpty(user.PasswordSalt))
            {
                return Unauthorized("Geçersiz e-posta veya şifre.");
            }

            byte[] passwordSalt;
            try
            {
                passwordSalt = Convert.FromBase64String(user.PasswordSalt);
            }
            catch (FormatException)
            {
                return Unauthorized("Geçersiz e-posta veya şifre.");
            }

            using var hmac = new HMACSHA512(passwordSalt);
            var computedHash = Convert.ToBase64String(hmac.ComputeHash(Encoding.UTF8.GetBytes(model.Password)));

            if (user.PasswordHash != computedHash)
            {
                return Unauthorized("Geçersiz e-posta veya şifre.");
            }

            var token = _tokenService.GenerateToken(user.Id);

            return Ok(new { token, userId = user.Id, message = "Giriş başarılı." });
        }
    }

    public class RegisterModel
    {
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string? ProfilePictureUrl { get; set; }
    }

    public class LoginModel
    {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}
