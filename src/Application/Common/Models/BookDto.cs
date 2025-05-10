using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using AspireApp.Application.Books.Commands.AddBook;
using AspireApp.Domain.Entities;

namespace AspireApp.Application.Common.Models;
public class BookDto
{
    public int Id { get; set; }
    public string Title { get; set; } = null!;
    public string Author { get; set; } = null!;
    public string ImagePath { get; set; } = null!;
    public int TotalPages { get; set; }

    [JsonIgnore]
    public string UserId { get; set; } = null!;

    public float AverageRating { get; set; }
    public string Description { get; set; } = null!;
    public string BookFilePath { get; set; } = null!;
    public ICollection<ReviewDto> Reviews { get; set; } = new List<ReviewDto>();

    public ICollection<CategoryDto> Categories { get; set; } = new List<CategoryDto>();

    private class Profiling : Profile
    {
        public Profiling()
        {
            CreateMap<Domain.Entities.Book, BookDto>();
        }
    }
}
