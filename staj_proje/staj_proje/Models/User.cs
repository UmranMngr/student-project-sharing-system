using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace staj_proje.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; } 
        public string? Username { get; set; }
        public string? Email { get; set; }
        public string? PasswordHash { get; set; }
        public string? PasswordSalt { get; set; } 
        public string? ProfilePictureUrl { get; set; }
        public string? Bio { get; set; }

        [JsonIgnore] 
        public ICollection<Post> Posts { get; set; } = new List<Post>();

        [JsonIgnore] 
        public ICollection<UserFollower> Followers { get; set; } = new List<UserFollower>();

        [JsonIgnore] 
        public ICollection<UserFollower> Following { get; set; } = new List<UserFollower>();

        [JsonIgnore]
        public ICollection<Notification> Notifications { get; set; } = new List<Notification>();

    }
}
