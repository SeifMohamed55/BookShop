using AspireApp.Application.Common.Interfaces;
using AspireApp.Application.Common.Models;
using AspireApp.Domain.Entities;
using GraduationProject.Application.Services;

namespace AspireApp.Application.Books.Commands.AddBook;

public record AddBookCommand : IRequest<ServiceResult<BookDto>>
{
    public required string Title { get; set; }
    public required string Description { get; set; }
    public required string File { get; set; }
    public required string Image { get; set; }
    public required string UserId{ get; set; }

    public ICollection<CategoryDto> CategoriesDto { get; set; } = [];

}

public class AddBookCommandValidator : AbstractValidator<AddBookCommand>
{
    public AddBookCommandValidator()
    {
    }
}

public class AddBookCommandHandler : IRequestHandler<AddBookCommand, ServiceResult<BookDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IUser _user;
    private readonly IStorageService _imageStorageService;
    private readonly IIdentityService _identityService;
    private readonly IMapper _mapper;

    public AddBookCommandHandler
        (IApplicationDbContext context,
        IUser user,
        IStorageService imageStorageService,
        IIdentityService identityService,
        IMapper mapper)
    {
        _context = context;
        _user = user;
        _imageStorageService = imageStorageService;
        _identityService = identityService;
        _mapper = mapper;
    }

    public async Task<ServiceResult<BookDto>> Handle(AddBookCommand request, CancellationToken cancellationToken)
    {
        if (request.UserId != (_user.Id ?? ""))
        {
            return ServiceResult<BookDto>.Failure
                ("You are not authorized to add this book", System.Net.HttpStatusCode.Unauthorized);
        }


        var res =  await _identityService.GetUserDtoById(request.UserId);

        if (!res.TryGetData(out var user))
        {
            return ServiceResult<BookDto>.Failure
                ("User not found", System.Net.HttpStatusCode.NotFound);
        }

        var categories = await _context.Categories
            .Where(x => request.CategoriesDto.Select(c => c.Id).Contains(x.Id)).ToListAsync();

        var pdfFile = await _imageStorageService.SavePdfAsync(request.File);
        if (pdfFile.Item2 == 0)           
        {
            return ServiceResult<BookDto>.Failure
                ("Error saving PDF file", System.Net.HttpStatusCode.InternalServerError);
        }
        var imageFilePath = await _imageStorageService.SaveImageAsync(request.Image, FileType.BookImage);


        var book = new Book()
        {
            Title = request.Title,
            Description = request.Description,
            BookFilePath = pdfFile.Item1,
            TotalPages = pdfFile.Item2,
            UserId = request.UserId,
            Categories = categories,
            Author = user.FullName,
            ImagePath = imageFilePath,     
        };


        _context.Books.Add(book);
        await _context.SaveChangesAsync(cancellationToken);


        return ServiceResult<BookDto>.Success
            (_mapper.Map<BookDto>(book), "Book added successfully", System.Net.HttpStatusCode.Created);

    }
}
