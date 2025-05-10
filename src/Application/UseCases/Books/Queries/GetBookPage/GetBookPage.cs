using System.Net;
using AspireApp.Application.Common.Interfaces;
using GraduationProject.Application.Services;

namespace AspireApp.Application.Books.Queries.GetBookPage;

public record GetBookPageQuery(int bookId, int page) : IRequest<ServiceResult<byte[]>>
{
}

public class GetBookPageQueryValidator : AbstractValidator<GetBookPageQuery>
{
    public GetBookPageQueryValidator()
    {
    }
}

public class GetBookPageQueryHandler : IRequestHandler<GetBookPageQuery, ServiceResult<byte[]>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;
    private readonly IStorageService _storageService;

    public GetBookPageQueryHandler(IApplicationDbContext context, IMapper mapper, IStorageService storageService)
    {
        _context = context;
        _mapper = mapper;
        _storageService = storageService;
    }

    public async Task<ServiceResult<byte[]>> Handle(GetBookPageQuery request, CancellationToken cancellationToken)
    {
        var book = await _context.Books.FirstOrDefaultAsync(x => x.Id == request.bookId);
        if(book == null)
            return ServiceResult<byte[]>.Failure("Book not found", HttpStatusCode.NotFound);

        return ServiceResult<byte[]>.Success(
            _storageService.GetBookPage(book.BookFilePath, request.page),
            "Successfully retrieved book page.");
    }
}
