using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace staj_proje.Models
{
    public class Post
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }

        public string? ImageUrl { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public int LikeCount { get; set; }

        public DateTime CreatedAt { get; set; }

        [JsonIgnore] 
        public User? User { get; set; }

        [JsonIgnore] 
        public ICollection<Comment> Comments { get; set; } = new List<Comment>();

        [JsonIgnore] 
        public ICollection<Like> Likes { get; set; } = new List<Like>();
    }
}
