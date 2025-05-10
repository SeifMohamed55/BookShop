using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AspireApp.Domain.Entities;

namespace AspireApp.Application.Common.Models;
public class BooksByGenreDto
{
     public int Id { get; set; }
    public string Title { get; set; } = null!;
    public string Author { get; set; } = null!;
    public string Description { get; set; } = null!;
    public string ImagePath { get; set; } = null!;
    public int TotalPages { get; set; }
    public float AverageRating { get; set; }
    public ICollection<String> Categories { get; set; } = [];

    public  class Profiling : Profile
    {
        public Profiling()
        {
            CreateMap<Book, BooksByGenreDto>()
        .ForMember(dest => dest.Categories,
            opt => opt.MapFrom(src => src.Categories.Select(c => c.Name)));
        }
    }
}
