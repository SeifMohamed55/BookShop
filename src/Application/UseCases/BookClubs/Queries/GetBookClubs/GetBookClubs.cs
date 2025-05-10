using System.Net;
using AspireApp.Application.Common.Interfaces;
using AspireApp.Application.Common.Models;
using GraduationProject.Application.Services;

namespace AspireApp.Application.BookClubs.Queries.GetPopularBookClubs;

public record GetPopularBookClubsQuery : IRequest<ServiceResult<IEnumerable<BookClubDto>>> { }

public class GetPopularBookClubsQueryValidator : AbstractValidator<GetPopularBookClubsQuery>
{
    public GetPopularBookClubsQueryValidator()
    {
    }
}

public class GetPopularBookClubsQueryHandler :
    IRequestHandler<GetPopularBookClubsQuery, ServiceResult<IEnumerable<BookClubDto>>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;
    private readonly IIdentityService _identityService;

    public GetPopularBookClubsQueryHandler(IApplicationDbContext context, IMapper mapper, IIdentityService identityService)
    {
        _context = context;
        _mapper = mapper;
        _identityService = identityService;
    }

    public async Task<ServiceResult<IEnumerable<BookClubDto>>> Handle(GetPopularBookClubsQuery request, CancellationToken cancellationToken)
    {
        try
        {
            var popularBookClubs = await _context.BookClubs
                .OrderByDescending(bc => bc.UserBookClubs.Count)
                .ProjectTo<BookClubDto>(_mapper.ConfigurationProvider)
                .Take(10)
                .ToListAsync(cancellationToken);

            return ServiceResult<IEnumerable<BookClubDto>>.Success(
                popularBookClubs,
                "Successfully retrieved popular book clubs.");
        }
        catch
        {
            return ServiceResult<IEnumerable<BookClubDto>>.Failure(
                "An error occurred while retrieving popular book clubs.",
                HttpStatusCode.InternalServerError);
        }
    }
}
