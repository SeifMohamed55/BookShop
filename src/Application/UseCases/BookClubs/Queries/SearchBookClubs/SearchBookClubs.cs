using System.Net;
using AspireApp.Application.Common.Interfaces;
using AspireApp.Application.Common.Models;
using GraduationProject.Application.Services;

namespace AspireApp.Application.BookClubs.Queries.SearchBookClubs;

public record SearchBookClubsQuery(string Keyword) : IRequest<ServiceResult<IEnumerable<BookClubDto>>>;


public class SearchBookClubsQueryValidator : AbstractValidator<SearchBookClubsQuery>
{
    public SearchBookClubsQueryValidator()
    {
        RuleFor(x => x.Keyword)
            .NotEmpty().WithMessage("Keyword is required.")
            .MinimumLength(2).WithMessage("Keyword must be at least 2 characters long.");
    }
}


public class SearchBookClubsQueryHandler : IRequestHandler<SearchBookClubsQuery, ServiceResult<IEnumerable<BookClubDto>>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;
    private readonly IIdentityService _identityService;

    public SearchBookClubsQueryHandler(IApplicationDbContext context, IMapper mapper, IIdentityService identityService)
    {
        _context = context;
        _mapper = mapper;
        _identityService = identityService;
    }

    public async Task<ServiceResult< IEnumerable<BookClubDto>>> Handle(SearchBookClubsQuery request, CancellationToken cancellationToken)
    {
        try
        {
            var query = _context.BookClubs
            .Include(bc => bc.Books)
            .Include(bc => bc.UserBookClubs)
            .AsQueryable();

            if (!string.IsNullOrWhiteSpace(request.Keyword))
            {
                query = query.Where(bc =>
                    bc.Name.Contains(request.Keyword) ||
                    bc.Description.Contains(request.Keyword) ||
                    bc.Books.Any(b => b.Title.Contains(request.Keyword)));
            }

            var bookClubs = await query.ProjectTo<BookClubDto>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

            foreach (var bookClub in bookClubs)
            {
                var author = await _identityService.GetUserNameAsync(bookClub.BookClubMember.UserId);
                if (author == null)
                    return ServiceResult<IEnumerable<BookClubDto>>.Failure(
                        "An error occurred while retrieving popular book clubs.",
                        HttpStatusCode.InternalServerError);

                bookClub.Author = author;
            }

            return ServiceResult<IEnumerable<BookClubDto>>.Success(bookClubs, "Book clubs fetched successfully.");
        }
        catch
        {
            return ServiceResult<IEnumerable<BookClubDto>>.Failure(
                "An error occurred while searching for book clubs.",
                HttpStatusCode.InternalServerError);
        }
        
    }
}
