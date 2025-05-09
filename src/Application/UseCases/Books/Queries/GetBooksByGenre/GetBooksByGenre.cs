using System.Net;
using AspireApp.Application.Common.Interfaces;
using AspireApp.Application.Common.Models;
using AspireApp.Domain.Entities;
using GraduationProject.Application.Services;

namespace AspireApp.Application.Books.Queries.GetBooksByGenre;

public record GetBooksByGenreQuery(string Genre)
    : IRequest<ServiceResult<IEnumerable<BooksByGenreDto>>>;


public class GetBooksByGenreQueryValidator : AbstractValidator<GetBooksByGenreQuery>
{
    public GetBooksByGenreQueryValidator()
    {
        RuleFor(x => x.Genre)
           .NotEmpty().WithMessage("Genre is required.")
           .MaximumLength(100);
    }
}

public class GetBooksByGenreQueryHandler :
    IRequestHandler<GetBooksByGenreQuery, ServiceResult<IEnumerable<BooksByGenreDto>>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;
    private readonly IIdentityService _identityService;

    public GetBooksByGenreQueryHandler(IApplicationDbContext context, IMapper mapper, IIdentityService userService)
    {
        _context = context;
        _mapper = mapper;
        _identityService = userService;
    }
    public async Task<ServiceResult<IEnumerable<BooksByGenreDto>>>
        Handle(GetBooksByGenreQuery request, CancellationToken cancellationToken)
    {
        try
        {
            var booksByGenre = await _context.Books
                .Where(b => b.Categories.Any(c => c.Name == request.Genre))
                .ProjectTo<BooksByGenreDto>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

            return ServiceResult<IEnumerable<BooksByGenreDto>>.Success(
                booksByGenre,
                "Successfully retrieved books by genre.");
        }
        catch
        {
            return ServiceResult<IEnumerable<BooksByGenreDto>>.Failure(
                "An error occurred while retrieving books by genre.",
                HttpStatusCode.InternalServerError);
        }
    }

}
