using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace AspireApp.Application.Common.Models;
public class ReviewDto
{
    public int Id { get; set; }
    public UserDto User { get; set; } = null!;
    public string Comment { get; set; } = null!;
    public int Likes { get; set; }
    public byte Rating { get; set; }

    [JsonIgnore]
    public string UserId { get; set; } = null!;
    public DateTimeOffset LastModified { get; set; }
    private class Profiling :Profile
    {
        public Profiling()
        {
            CreateMap<Domain.Entities.Review, ReviewDto>()
                .ForMember(dest => dest.User, opt => opt.Ignore()); // Ignore here if you're setting User manually after mapping
            
        }
    }
}
