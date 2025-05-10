using AspireApp.Application.Common.Interfaces;
using AspireApp.Domain.Entities;
using GraduationProject.Application.Services;

namespace AspireApp.Application.Categories.Queries.GetCategories;

public record GetCategoriesQuery : IRequest<ServiceResult<IEnumerable<CategoryDto>>>
{
}

public class GetCategoriesQueryValidator : AbstractValidator<GetCategoriesQuery>
{
    public GetCategoriesQueryValidator()
    {
    }
}

public class GetCategoriesQueryHandler : IRequestHandler<GetCategoriesQuery, ServiceResult<IEnumerable<CategoryDto>>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetCategoriesQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<ServiceResult<IEnumerable<CategoryDto>>> Handle(GetCategoriesQuery request, CancellationToken cancellationToken)
    {
        try
        {
            var categories = await _context.Categories
                .ProjectTo<CategoryDto>(_mapper.ConfigurationProvider, cancellationToken)
                .ToListAsync();
        }
        catch
        {

        }


    }
}
