using System.Net;
using AspireApp.Application.Common.Interfaces;
using AspireApp.Application.Common.Models;
using GraduationProject.Application.Services;

namespace AspireApp.Application.Books.Queries.GetBookById;

public record GetBookByIdQuery(int id) : IRequest<ServiceResult<BookDto>>
{
}

public class GetBookByIdQueryValidator : AbstractValidator<GetBookByIdQuery>
{
    public GetBookByIdQueryValidator()
    {
    }
}

public class GetBookByIdQueryHandler : IRequestHandler<GetBookByIdQuery, ServiceResult<BookDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;
    private readonly IIdentityService _identityService;

    public GetBookByIdQueryHandler(IApplicationDbContext context, IMapper mapper, IIdentityService identityService)
    {
        _context = context;
        _mapper = mapper;
        _identityService = identityService;
    }

    public async Task<ServiceResult<BookDto>> Handle(GetBookByIdQuery request, CancellationToken cancellationToken)
    {
        try
        {
            var bookDto = await _context.Books
                .ProjectTo<BookDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(b => b.Id == request.id, cancellationToken);

            if (bookDto == null)
            {
                return ServiceResult<BookDto>.Failure("Book not found.", HttpStatusCode.NotFound);
            }

            var userDto = await _identityService.GetUserDtoById(bookDto.UserId);

            if (!userDto.TryGetData(out var data))
            {
                return ServiceResult<BookDto>.Failure("User not found.", HttpStatusCode.NotFound);
            }

            bookDto.Author = data.FullName;

            return ServiceResult<BookDto>.Success(bookDto, "Book fetched successfully.");
        }
        catch
        {
            return ServiceResult<BookDto>.Failure("An error occurred while fetching the book.", HttpStatusCode.InternalServerError);
        }

    }
}
