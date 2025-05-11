using AspireApp.Application.Common.Interfaces;
using AspireApp.Domain.Entities;
using FluentValidation;
using GraduationProject.Application.Services;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace AspireApp.Application.FavouriteGenres.Queries.GetFavouriteGenres
{
    public record GetFavouriteGenresQuery : IRequest<ServiceResult<List<CategoryDto>>>;

    public class GetFavouriteGenresQueryValidator : AbstractValidator<GetFavouriteGenresQuery>
    {
        private readonly IUser _currentUser ;

        public GetFavouriteGenresQueryValidator(IUser currentUser)
        {
            _currentUser = currentUser;

            RuleFor(x => x)
                .Must(_ => !string.IsNullOrEmpty(_currentUser.Id))
                .WithMessage("User  must be authenticated to retrieve favorite genres.");
        }
    }

    public class GetFavouriteGenresQueryHandler : IRequestHandler<GetFavouriteGenresQuery, ServiceResult<List<CategoryDto>>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IUser _currentUser;

        public GetFavouriteGenresQueryHandler(IApplicationDbContext context, IUser currentUser)
        {
            _context = context;
            _currentUser = currentUser;
        }

        public async Task<ServiceResult<List<CategoryDto>>> Handle(GetFavouriteGenresQuery request, CancellationToken cancellationToken)
        {
            if(_currentUser.Id == null)
            {
                return ServiceResult<List<CategoryDto>>.Failure("User not authenticated.");
            }

            var userBooks = await _context.UserBookProgresses
                .Where(ubp => ubp.UserId == _currentUser.Id)
                .Include(ubp => ubp.Book)
                    .ThenInclude(book => book.Categories)
                .ToListAsync(cancellationToken);

            var topCategories = userBooks
                .SelectMany(ubp => ubp.Book.Categories)
                .GroupBy(category => category.Id)
                .Select(group => new
                {
                    Category = group.First(),
                    Count = group.Count()
                })
                .OrderByDescending(g => g.Count)
                .Take(3)
                .Select(g => new CategoryDto
                {
                    Id = g.Category.Id,
                    Name = g.Category.Name
                })
                .ToList();

            return ServiceResult<List<CategoryDto>>.Success(topCategories, "Success.");
        }
    }
}
