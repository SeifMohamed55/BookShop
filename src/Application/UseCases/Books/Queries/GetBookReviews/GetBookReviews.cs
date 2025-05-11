using AspireApp.Application.Common.Interfaces;
using AspireApp.Application.Common.Models;
using GraduationProject.Application.Services;

namespace AspireApp.Application.Books.Queries.GetBookReviews;

public record GetBookReviewsQuery(int bookId) : IRequest<ServiceResult<IEnumerable<ReviewDto>>>
{
}

public class GetBookReviewsQueryValidator : AbstractValidator<GetBookReviewsQuery>
{
    public GetBookReviewsQueryValidator()
    {
    }
}

public class GetBookReviewsQueryHandler : IRequestHandler<GetBookReviewsQuery, ServiceResult<IEnumerable<ReviewDto>>>
{
    private readonly IApplicationDbContext _context;
    private readonly IIdentityService _identityService;
    private readonly IMapper _mapper;

    public GetBookReviewsQueryHandler(IApplicationDbContext context, IIdentityService identityService, IMapper mapper)
    {
        _context = context;
        _identityService = identityService;
        _mapper = mapper;
    }

    public async Task<ServiceResult<IEnumerable<ReviewDto>>> Handle(GetBookReviewsQuery request, CancellationToken cancellationToken)
    {
        var reviewDtos = await _context.Reviews
            .Where(x => x.BookId == request.bookId)
            .ProjectTo<ReviewDto>(_mapper.ConfigurationProvider)
            .ToListAsync(cancellationToken);

        foreach (var item in reviewDtos)
        {
            var user = await _identityService.GetUserDtoById(item.UserId);
            if (user.TryGetData(out var data))
                item.User = data;
        }

        return ServiceResult<IEnumerable<ReviewDto>>.Success(reviewDtos, "Reviews retrieved successfully");

    }
}
