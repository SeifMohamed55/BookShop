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
    private readonly IUser _user;

    public GetBookPageQueryHandler
        (IApplicationDbContext context, IMapper mapper, IStorageService storageService, IUser user)
    {
        _context = context;
        _mapper = mapper;
        _storageService = storageService;
        _user = user;
    }

    public async Task<ServiceResult<byte[]>> Handle(GetBookPageQuery request, CancellationToken cancellationToken)
    {
        var book = await _context.Books.FirstOrDefaultAsync(x => x.Id == request.bookId);
        if(book == null)
            return ServiceResult<byte[]>.Failure("Book not found", HttpStatusCode.NotFound);

        var bookPage = _storageService.GetBookPage(book.BookFilePath, request.page);
        if (bookPage.Length == 0)
            return ServiceResult<byte[]>.Failure("Book page not found", HttpStatusCode.NotFound);
        if(_user.Id != null)
        {
            var bookProgress = await _context.UserBookProgresses
                .FirstOrDefaultAsync(x => x.BookId == request.bookId && x.UserId == _user.Id);

            if (bookProgress != null)
            {
                if(bookProgress.CurrentPage + 1 ==  request.page)
                {
                    bookProgress.CurrentPage = request.page;
                    await _context.SaveChangesAsync(cancellationToken);

                }
            }
        }
        return ServiceResult<byte[]>.Success(bookPage, "Successfully retrieved book page.");
    }
}
