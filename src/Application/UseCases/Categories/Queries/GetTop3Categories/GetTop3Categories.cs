using AspireApp.Application.Common.Interfaces;
using AspireApp.Domain.Entities;
using GraduationProject.Application.Services;

namespace AspireApp.Application.Categories.Queries.GetTop3Categories;

public record GetTop3CategoriesQuery : IRequest<ServiceResult<IEnumerable<CategoryDto>>>
{
}

public class GetTop3CategoriesQueryValidator : AbstractValidator<GetTop3CategoriesQuery>
{
    public GetTop3CategoriesQueryValidator()
    {
    }
}

public class GetTop3CategoriesQueryHandler : IRequestHandler<GetTop3CategoriesQuery, ServiceResult<IEnumerable<CategoryDto>>>
{
    private readonly IApplicationDbContext _context;

    public GetTop3CategoriesQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<ServiceResult<IEnumerable<CategoryDto>>> Handle(GetTop3CategoriesQuery request, CancellationToken cancellationToken)
    {
        var categories = await _context.Categories
            .OrderByDescending(c => c.Books.Count)
            .Take(3)
            .ToListAsync(cancellationToken);
        var categoryDtos = categories.Select(c => new CategoryDto
        {
            Id = c.Id,
            Name = c.Name,
        });
        return ServiceResult<IEnumerable<CategoryDto>>.Success(categoryDtos, "Successfully retrieved top 3 categories.");
    }
}
