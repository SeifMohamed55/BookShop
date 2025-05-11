using System.Net;
using AspireApp.Application.Common.Interfaces;
using AspireApp.Application.Common.Models;
using AspireApp.Domain.Entities;
using GraduationProject.Application.Services;

namespace AspireApp.Application.Books.Queries.GetBookPage;

public record GetBookPageQuery(int bookId, int page) : IRequest<ServiceResult<BookPageDto>>
{
}

public class GetBookPageQueryValidator : AbstractValidator<GetBookPageQuery>
{
    public GetBookPageQueryValidator()
    {
    }
}

public class GetBookPageQueryHandler : IRequestHandler<GetBookPageQuery, ServiceResult<BookPageDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;
    private readonly IStorageService _storageService;
    private readonly IUser _user;
    private readonly IIdentityService _identityService;

    public GetBookPageQueryHandler
        (IApplicationDbContext context, IMapper mapper, IStorageService storageService, IUser user, IIdentityService service)
    {
        _context = context;
        _mapper = mapper;
        _storageService = storageService;
        _user = user;
        _identityService = service;

    }

    public async Task<ServiceResult<BookPageDto>> Handle(GetBookPageQuery request, CancellationToken cancellationToken)
    {
        var book = await _context.Books.FirstOrDefaultAsync(x => x.Id == request.bookId);
        if(book == null)
            return ServiceResult<BookPageDto>.Failure("Book not found", HttpStatusCode.NotFound);

        var bookPage = _storageService.GetBookPage(book.BookFilePath, request.page);
        if (bookPage.Length == 0)
            return ServiceResult<BookPageDto>.Failure("Book page not found", HttpStatusCode.NotFound);
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

        var bookPageDto = new BookPageDto
        {
            TotalPages = book.TotalPages,
            CurrentPage = request.page,
            Content = bookPage,
        };
        return ServiceResult<BookPageDto>.Success(bookPageDto, "Successfully retrieved book page.");
    }
}
