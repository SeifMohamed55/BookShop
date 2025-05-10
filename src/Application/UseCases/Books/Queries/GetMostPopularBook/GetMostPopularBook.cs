using AspireApp.Application.Common.Interfaces;
using AspireApp.Application.Common.Models;
using GraduationProject.Application.Services;

namespace AspireApp.Application.Books.Queries.GetMostPopularBook;

public record GetMostPopularBookQuery : IRequest<ServiceResult<BookDto>>
{
}

public class GetMostPopularBookQueryValidator : AbstractValidator<GetMostPopularBookQuery>
{
    public GetMostPopularBookQueryValidator()
    {
    }
}

public class GetMostPopularBookQueryHandler : IRequestHandler<GetMostPopularBookQuery, ServiceResult<BookDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetMostPopularBookQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<ServiceResult<BookDto>> Handle(GetMostPopularBookQuery request, CancellationToken cancellationToken)
    {
        var mostPopularBook = await _context.Books
            .Include(b => b.Reviews)
            .Include(b => b.Categories)
            .OrderByDescending(b => b.AverageRating)
            .ProjectTo<BookDto>(_mapper.ConfigurationProvider)
            .FirstOrDefaultAsync(cancellationToken);

        if (mostPopularBook == null)
        {
            return ServiceResult<BookDto>.Failure("No books found");
        }

        return ServiceResult<BookDto>.Success(mostPopularBook, "Most popular book retrieved successfully");
    }
}


