using Microsoft.AspNetCore.Mvc;
using staj_proje.Models;
using staj_proje.Data; // MyDataBaseContext için namespace

namespace staj_proje.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationsController : ControllerBase
    {
        private readonly MyDataBaseContext _context;

        public NotificationsController(MyDataBaseContext context)
        {
            _context = context;
        }

        [HttpDelete("delete-by-user/{userId}")]
        public IActionResult DeleteUserNotifications(int userId)
        {
            var notifications = _context.Notifications.Where(n => n.UserId == userId).ToList();

            if (!notifications.Any())
            {
                return NotFound("Bu kullanýcýya ait silinecek bildirim bulunamadý.");
            }

            _context.Notifications.RemoveRange(notifications);
            _context.SaveChanges();

            return Ok("Bu kullanýcýya ait tüm bildirimler baþarýyla silindi.");
        }
    }
}
