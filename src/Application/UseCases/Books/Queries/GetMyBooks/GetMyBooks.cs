using System.Net;
using AspireApp.Application.Common.Interfaces;
using AspireApp.Application.Common.Models;
using AspireApp.Domain.Entities;
using AutoMapper;
using GraduationProject.Application.Services;
using Microsoft.EntityFrameworkCore;

namespace AspireApp.Application.Books.Queries.GetMyBooks;

public record GetMyBooksQuery(string UserId, string? Status)
    : IRequest<ServiceResult<IEnumerable<MyBooksDto>>>;

public class GetMyBooksQueryValidator : AbstractValidator<GetMyBooksQuery>
{
    public GetMyBooksQueryValidator()
    {
        RuleFor(x => x.UserId)
            .NotEmpty()
            .WithMessage("UserId is required.");
    }
}

public class GetMyBooksQueryHandler :
    IRequestHandler<GetMyBooksQuery, ServiceResult<IEnumerable<MyBooksDto>>>
{
    private readonly IApplicationDbContext _context;
    private readonly IUser _user;
    private readonly IStorageService _imageStorageService;
    private readonly IIdentityService _identityService;
    private readonly IMapper _mapper;

    public GetMyBooksQueryHandler(IApplicationDbContext context,
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

    public async Task<ServiceResult<IEnumerable<MyBooksDto>>> Handle(GetMyBooksQuery request, CancellationToken cancellationToken)
    {
        try
        {
            if (request.UserId != (_user.Id ?? ""))
            {
                return ServiceResult<IEnumerable<MyBooksDto>>.Failure
                    ("You are not authorized");

            }

            var currentUserId = request.UserId; // Fix: Define currentUserId based on request.UserId

            var query = _context.UserBookProgresses
                .Include(p => p.Book)
                    .ThenInclude(b => b.Categories)
                .Where(p => p.UserId == currentUserId);

            if (!string.IsNullOrEmpty(request.Status))
            {
                if (request.Status.Equals("Completed", StringComparison.OrdinalIgnoreCase))
                    query = query.Where(p => p.IsCompleted);
                else if (request.Status.Equals("Reading", StringComparison.OrdinalIgnoreCase))
                    query = query.Where(p => !p.IsCompleted);
            }

            var books = await query.ToListAsync(cancellationToken);

            var myBooksDto = books.Select(p => new MyBooksDto
            {
                Id = p.Book.Id,
                Title = p.Book.Title,
                Author = p.Book.Author,
                Description = p.Book.Description,
                ImagePath = p.Book.ImagePath,
                TotalPages = p.Book.TotalPages,
                AverageRating = p.Book.AverageRating,
                Categories = p.Book.Categories.Select(c => c.Name).ToList(),
                ReadingPercentage = p.Book.TotalPages == 0 ? 0 : Math.Round((double)p.CurrentPage / p.Book.TotalPages * 100, 2),
                ReadingStatus = p.IsCompleted ? "✅ Completed" : "🚩 Currently Reading",
                IsCompleted = p.IsCompleted
            }).ToList();

            return ServiceResult<IEnumerable<MyBooksDto>>.Success(myBooksDto, "My books retrieved successfully.");
        }
        catch
        {
            return ServiceResult<IEnumerable<MyBooksDto>>.Failure("An error occurred while retrieving books.");
        }
    }
}
