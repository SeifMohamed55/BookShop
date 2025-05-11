using System.Net;
using AspireApp.Application.Common.Interfaces;
using AspireApp.Application.Common.Models;
using GraduationProject.Application.Services;

namespace AspireApp.Application.Books.Queries.GetAllBooks;

public record GetAllBooksQuery : IRequest<ServiceResult<IEnumerable<BooksByGenreDto>>>
{
}

public class GetAllBooksQueryValidator : AbstractValidator<GetAllBooksQuery>
{
    public GetAllBooksQueryValidator()
    {
    }
}

public class GetAllBooksQueryHandler : IRequestHandler<GetAllBooksQuery, ServiceResult<IEnumerable<BooksByGenreDto>>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetAllBooksQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<ServiceResult<IEnumerable<BooksByGenreDto>>> 
        Handle(GetAllBooksQuery request, CancellationToken cancellationToken)
    {
        try
        {
            var AllBooks = await _context.Books
                .ProjectTo<BooksByGenreDto>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

            return ServiceResult<IEnumerable<BooksByGenreDto>>.Success(
                AllBooks,
                "Successfully retrieved all books.");
        }
        catch
        {
            return ServiceResult<IEnumerable<BooksByGenreDto>>.Failure(
                "An error occurred while retrieving books.",
                HttpStatusCode.InternalServerError);
        }
    }
}
