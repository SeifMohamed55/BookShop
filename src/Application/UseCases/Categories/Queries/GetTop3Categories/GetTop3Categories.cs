using AspireApp.Application.Common.Interfaces;

namespace AspireApp.Application.Categories.Queries.GetTop3Categories;

public record GetTop3CategoriesQuery : IRequest<object>
{
}

public class GetTop3CategoriesQueryValidator : AbstractValidator<GetTop3CategoriesQuery>
{
    public GetTop3CategoriesQueryValidator()
    {
    }
}

public class GetTop3CategoriesQueryHandler : IRequestHandler<GetTop3CategoriesQuery, object>
{
    private readonly IApplicationDbContext _context;

    public GetTop3CategoriesQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<object> Handle(GetTop3CategoriesQuery request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}
