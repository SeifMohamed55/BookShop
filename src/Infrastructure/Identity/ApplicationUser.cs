using AspireApp.Application.Common.Models;
using AutoMapper;
using Microsoft.AspNetCore.Identity;

namespace AspireApp.Infrastructure.Identity;
public class ApplicationUser : IdentityUser
{
    public required string FullName { get; set; }
    public required string ImageUrl { get; set; }


    private class UserMappingProfile : Profile
    {
        public UserMappingProfile()
        {
            CreateMap<ApplicationUser, UserDto>();
        }
    }
}
