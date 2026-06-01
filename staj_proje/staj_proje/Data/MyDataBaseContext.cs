using Microsoft.EntityFrameworkCore;
using staj_proje.Models;

namespace staj_proje.Data
{
    public class MyDataBaseContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Like> Likes { get; set; }
        public DbSet<UserFollower> UserFollowers { get; set; }
        public DbSet<Notification> Notifications { get; set; }

        public MyDataBaseContext(DbContextOptions<MyDataBaseContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Notification - User ilişkisi
            modelBuilder.Entity<Notification>()
                .HasOne<User>(n => n.User) 
                .WithMany(u => u.Notifications) 
                .HasForeignKey(n => n.UserId)
                .OnDelete(DeleteBehavior.Cascade); 

            modelBuilder.Entity<Notification>()
                .HasIndex(n => new { n.UserId, n.CreatedAt }) 
                .IsUnique(false);

            // Post - Comment ilişkisi için kaskad silme
            modelBuilder.Entity<Comment>()
                .HasOne(c => c.Post)
                .WithMany(p => p.Comments)
                .HasForeignKey(c => c.PostId)
                .OnDelete(DeleteBehavior.Cascade); 

            // Post - Like ilişkisi için kaskad silme
            modelBuilder.Entity<Like>()
                .HasOne(l => l.Post)
                .WithMany(p => p.Likes)
                .HasForeignKey(l => l.PostId)
                .OnDelete(DeleteBehavior.Cascade); 

            // Post - User ilişkisi
            modelBuilder.Entity<Post>()
                .HasOne(p => p.User)
                .WithMany(u => u.Posts)
                .HasForeignKey(p => p.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            // Comment - User ilişkisi
            modelBuilder.Entity<Comment>()
                .HasOne(c => c.User)
                .WithMany()
                .HasForeignKey(c => c.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            // Like - User ilişkisi
            modelBuilder.Entity<Like>()
                .HasOne(l => l.User)
                .WithMany()
                .HasForeignKey(l => l.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            // Like - User + Post indeks
            modelBuilder.Entity<Like>()
                .HasIndex(l => new { l.UserId, l.PostId })
                .IsUnique();

            // UserFollower - Follower ilişkisi
            modelBuilder.Entity<UserFollower>()
                .HasOne(uf => uf.Follower)
                .WithMany(u => u.Following)
                .HasForeignKey(uf => uf.FollowerId)
                .OnDelete(DeleteBehavior.Restrict);

            // UserFollower - Followed ilişkisi
            modelBuilder.Entity<UserFollower>()
                .HasOne(uf => uf.Followed)
                .WithMany(u => u.Followers)
                .HasForeignKey(uf => uf.FollowedId)
                .OnDelete(DeleteBehavior.Restrict);

            // UserFollower - Follower + Followed indeks
            modelBuilder.Entity<UserFollower>()
                .HasIndex(uf => new { uf.FollowerId, uf.FollowedId })
                .IsUnique();

            base.OnModelCreating(modelBuilder);
        }
    }
}
