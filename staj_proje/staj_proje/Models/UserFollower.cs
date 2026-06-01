using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace staj_proje.Models
{
    public class UserFollower
    {
        [Key]
        public int Id { get; set; } 

        [ForeignKey("Follower")]
        public int FollowerId { get; set; }

        [ForeignKey("Followed")]
        public int FollowedId { get; set; } 

      
        public User? Follower { get; set; }
        public User? Followed { get; set; }
    }
}
