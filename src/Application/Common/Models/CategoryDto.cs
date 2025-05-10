using System.Collections.Generic;
using AutoMapper;

namespace AspireApp.Domain.Entities
{
    public class CategoryDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;

        public class Profiling : Profile
        {
            public Profiling()
            {
                // Entity to DTO mapping
                CreateMap<Category, CategoryDto>();
            }
        }
    }
}
