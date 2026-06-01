using AutoMapper;
using staj_proje.DTOs;
using staj_proje.Models;

namespace staj_proje.DTOs.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<User, UserDTO>()
                .ForMember(dest => dest.Posts, opt => opt.MapFrom(src => src.Posts))
                .ForMember(dest => dest.Followers, opt => opt.MapFrom(src => src.Followers))
                .ForMember(dest => dest.Following, opt => opt.MapFrom(src => src.Following));

            CreateMap<Post, PostDTO>()
                .ForMember(dest => dest.Comments, opt => opt.MapFrom(src => src.Comments))
                .ForMember(dest => dest.Likes, opt => opt.MapFrom(src => src.Likes))
                .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => src.CreatedAt));

            CreateMap<Comment, CommentDTO>()
                .ForMember(dest => dest.PostId, opt => opt.MapFrom(src => src.PostId))
                .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.UserId))
                .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => src.CreatedAt))
                .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.User != null ? src.User.Username : "Unknown")); // Null kontrolü ekleyin

            CreateMap<Like, LikeDTO>();

            CreateMap<UserFollower, UserFollowerDTO>()
                .ForMember(dest => dest.FollowerId, opt => opt.MapFrom(src => src.FollowerId))
                .ForMember(dest => dest.FollowedId, opt => opt.MapFrom(src => src.FollowedId));
        }
    }
}
