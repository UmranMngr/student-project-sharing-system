
namespace staj_proje.DTOs
{
    public class UserUpdateDTO
    {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Bio { get; set; } = string.Empty;
        public IFormFile? ProfileImage { get; set; }
    }
}
   
