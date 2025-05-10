using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AspireApp.Application.Common.Models;
public class MyBooksDto
{
    public int Id { get; set; }
    public string Title { get; set; } = null!;
    public string Author { get; set; } = null!;
    public string Description { get; set; } = null!;
    public string ImagePath { get; set; } = null!;
    public int TotalPages { get; set; }
    public float AverageRating { get; set; }
    public ICollection<string> Categories { get; set; } = [];
    public double ReadingPercentage { get; set; }
    public string ReadingStatus { get; set; } = null!;
    public bool IsCompleted { get; set; } // ✅ New property


    private class Profiling : Profile
    {
        public Profiling()
        {
            CreateMap<Domain.Entities.UserBookProgress, MyBooksDto>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Book.Id))
                .ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Book.Title))
                .ForMember(dest => dest.Author, opt => opt.MapFrom(src => src.Book.Author))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Book.Description))
                .ForMember(dest => dest.ImagePath, opt => opt.MapFrom(src => src.Book.ImagePath))
                .ForMember(dest => dest.TotalPages, opt => opt.MapFrom(src => src.Book.TotalPages))
                .ForMember(dest => dest.AverageRating, opt => opt.MapFrom(src => src.Book.AverageRating))
                .ForMember(dest => dest.Categories, opt => opt.MapFrom(src => src.Book.Categories.Select(c => c.Name)))
                .ForMember(dest => dest.ReadingStatus,
                    opt => opt.MapFrom(src => src.IsCompleted ? "✅ Completed" : "🚩 Currently Reading"))
                .ForMember(dest => dest.ReadingPercentage,
                    opt => opt.MapFrom(src =>
                        src.Book.TotalPages == 0 ? 0 : Math.Round((double)src.CurrentPage / src.Book.TotalPages * 100, 2)))
                .ForMember(dest => dest.IsCompleted, opt => opt.MapFrom(src => src.IsCompleted)); // ✅ This line
        }
    }

}
