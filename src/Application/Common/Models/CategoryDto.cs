using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AspireApp.Application.Common.Models;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace AspireApp.Domain.Entities;
public class CategoryDto
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;

    public class Profiling : Profile
    {
        public Profiling()
        {
            // Entity to DTO
            CreateMap<Category, CategoryDto>();

        }
    }

}
