using AspireApp.Application.Common.Models;
using AspireApp.Domain.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Identity;

namespace AspireApp.Infrastructure.Identity;
public class ApplicationUser : IdentityUser
{
    public required string FullName { get; set; }
    public required string ImageUrl { get; set; }

    public ICollection<Book> PublishedBooks { get; set; } = [];
    public ICollection<UserBookProgress> InterestingBooks  { get; set; } = [];
    public ICollection<Review> Reviews { get; set; } = [];
    public ICollection<BookClubMember> BookClubs { get; set; } = new List<BookClubMember>();




    private class UserMappingProfile : Profile
    {
        public UserMappingProfile()
        {
            CreateMap<ApplicationUser, UserDto>();
        }
    }
}
