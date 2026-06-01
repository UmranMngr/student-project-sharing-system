namespace staj_proje.DTOs
{
    public class CommentDTO
    {
        public int Id { get; set; }
        public string Text { get; set; } = string.Empty;
        public int UserId { get; set; }
        public string UserName { get; set; } = string.Empty; 
        public int PostId { get; set; }
        public DateTime CreatedAt { get; set; }
    }
    

}