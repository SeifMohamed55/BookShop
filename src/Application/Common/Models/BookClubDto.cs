using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using AspireApp.Domain.Entities;

namespace AspireApp.Application.Common.Models;
public class BookClubDto
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string Description { get; set; }
    public required string ImagePath { get; set; }

    [JsonIgnore]
    public BookClubMember BookClubMember { get; set; } = null!;
    public BookDto? MostPopularBook { get; set; }
    public string Author { get; set; } = null!;
    public int NumberOfMembers { get; set; }

    private class BookClubProfile : Profile
    {
        public BookClubProfile()
        {
            CreateMap<BookClub, BookClubDto>()
                .ForMember(dest => dest.NumberOfMembers,
                    opt => opt.MapFrom(src => src.UserBookClubs.Count))
                .ForMember(dest => dest.MostPopularBook,
                    opt => opt.MapFrom(src => src.Books
                        .OrderByDescending(b => b.AverageRating)
                        .FirstOrDefault()))
                .ForMember(dest => dest.BookClubMember, opt => opt.MapFrom(x=> x.UserBookClubs
                    .FirstOrDefault(x => x.Role == Domain.Enums.MemberRole.Admin)))
                .ForMember(dest => dest.Author, opt => opt.Ignore());
        }
    }
}
