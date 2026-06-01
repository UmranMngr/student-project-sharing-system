using System;
using System.Text.Json.Serialization;

namespace staj_proje.DTOs
{
    public class PostDTO
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string ImageUrl { get; set; } = string.Empty;
        public int LikeCount { get; set; }
        public int UserId { get; set; }
        public DateTime CreatedAt { get; set; } 
        [JsonIgnore] 
        public ICollection<CommentDTO> Comments { get; set; } = new List<CommentDTO>();
        [JsonIgnore] 
        public ICollection<LikeDTO> Likes { get; set; } = new List<LikeDTO>();
    }
}
