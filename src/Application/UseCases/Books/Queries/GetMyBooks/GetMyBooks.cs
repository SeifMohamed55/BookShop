using System.Net;
using AspireApp.Application.Common.Interfaces;
using AspireApp.Application.Common.Models;
using AspireApp.Domain.Entities;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using GraduationProject.Application.Services;
using Microsoft.EntityFrameworkCore;

namespace AspireApp.Application.Books.Queries.GetMyBooks;

public record GetMyBooksQuery(string UserId, bool? Status)
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

            if (request.Status.HasValue)
            {
                    query = query.Where(p => p.IsCompleted==request.Status);
            }
         
            var books = await query.ProjectTo<MyBooksDto>(_mapper.ConfigurationProvider).ToListAsync(cancellationToken);

            return ServiceResult<IEnumerable<MyBooksDto>>.Success(books, "My books retrieved successfully.");
        }
        catch
        {
            return ServiceResult<IEnumerable<MyBooksDto>>.Failure("An error occurred while retrieving books.");
        }
    }
}
