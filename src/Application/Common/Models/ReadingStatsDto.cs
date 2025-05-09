using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AspireApp.Domain.Entities;

namespace AspireApp.Application.Common.Models;
public class ReadingStatsDto
{
    public int StartPage { get; set; }
    public int EndPage { get; set; }
    public int BookProgressId { get; set; }
    public int ReadPages { get; set; }
    public int TotalPages { get; set; }
    public double ProgressPercentage { get; set; }

    public string Summary => $"{ReadPages:N0} of {TotalPages:N0} pages\n\n{ProgressPercentage:N0}%";
    public List<DailyReadingRecordDto> DailyReadingProgress { get; set; } = new();

    public class ReadingStatsProfile : Profile
    {
        public ReadingStatsProfile()
        {
            CreateMap<BookProgressHistory, ReadingStatsDto>()
                .ForMember(dest => dest.BookProgressId, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.StartPage, opt => opt.MapFrom(src => src.StartPage))
                .ForMember(dest => dest.EndPage, opt => opt.MapFrom(src => src.EndPage))
                .ForMember(dest => dest.ReadPages, opt => opt.MapFrom(src => src.EndPage - src.StartPage + 1))
                .ForMember(dest => dest.TotalPages, opt => opt.MapFrom(src => src.Book.TotalPages))
                .ForMember(dest => dest.ProgressPercentage, opt => opt.MapFrom(src =>
                    ((double)(src.EndPage - src.StartPage + 1) / src.Book.TotalPages) * 100));
        }
    }
}
