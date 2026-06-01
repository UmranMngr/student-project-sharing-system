using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace staj_proje.DTOs
{
    public class UserDTO
    {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string ProfilePictureUrl { get; set; } = string.Empty;
        public string Bio { get; set; } = string.Empty;

        [JsonIgnore]
        public ICollection<PostDTO> Posts { get; set; } = new List<PostDTO>();

        [JsonIgnore]
        public ICollection<UserFollowerDTO> Following { get; set; } = new List<UserFollowerDTO>();

        [JsonIgnore]
        public ICollection<UserFollowerDTO> Followers { get; set; } = new List<UserFollowerDTO>();
    }
}
