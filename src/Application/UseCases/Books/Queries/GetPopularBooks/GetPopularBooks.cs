using System.Net;
using AspireApp.Application.Common.Interfaces;
using AspireApp.Application.Common.Models;
using AspireApp.Domain.Entities;
using GraduationProject.Application.Services;

namespace AspireApp.Application.Books.Queries.GetPopularBooks;

public record GetPopularBooksQuery : IRequest<ServiceResult<IEnumerable<PopularBookDto>>>
{
}

public class GetPopularBooksQueryValidator : AbstractValidator<GetPopularBooksQuery>
{
    public GetPopularBooksQueryValidator()
    {
    }
}

public class GetPopularBooksQueryHandler : 
    IRequestHandler<GetPopularBooksQuery, ServiceResult<IEnumerable<PopularBookDto>>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;
    private readonly IIdentityService _identityService;

    public GetPopularBooksQueryHandler(IApplicationDbContext context, IMapper mapper, IIdentityService userService)
    {
        _context = context;
        _mapper = mapper;
        _identityService = userService;
    }


    public async Task<ServiceResult<IEnumerable<PopularBookDto>>> 
        Handle(GetPopularBooksQuery request, CancellationToken cancellationToken)
    {
        try
        {
            var popularBooks = await _context.Books
                .OrderByDescending(b => b.AverageRating)
                .ProjectTo<PopularBookDto>(_mapper.ConfigurationProvider)
                .Take(10)
                .ToListAsync();

            return ServiceResult<IEnumerable<PopularBookDto>>.Success(
                popularBooks,
                "Successfully retrieved popular books.");
        }
        catch
        {
            return ServiceResult<IEnumerable<PopularBookDto>>.Failure(
                "An error occurred while retrieving popular books.",
                HttpStatusCode.InternalServerError);
        }


    }
}
