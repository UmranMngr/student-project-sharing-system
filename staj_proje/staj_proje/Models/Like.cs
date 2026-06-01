using Microsoft.Extensions.Hosting;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using staj_proje.Models;

namespace staj_proje.Models
{
    public class Like
    {
        [Key]
        public int Id { get; set; } 

        [ForeignKey("Post")]
        public int PostId { get; set; }  

        [ForeignKey("User")]
        public int UserId { get; set; }  

        public Post? Post { get; set; }
        public User? User { get; set; }
    }
}
