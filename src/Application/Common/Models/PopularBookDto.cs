using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AspireApp.Application.Common.Models;
public class PopularBookDto
{
    public int Id { get; set; }
    public string Title { get; set; } = null!;
    public string Author { get; set; } = null!;
    public string ImagePath { get; set; } = null!;
    public int TotalPages { get; set; }
    public float AverageRating { get; set; }


    private class Profiling : Profile
    {
        public Profiling()
        {
            CreateMap<Domain.Entities.Book, PopularBookDto>();
        }
    }
}
