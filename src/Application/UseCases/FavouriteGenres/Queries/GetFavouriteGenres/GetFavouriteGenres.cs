using AspireApp.Application.Common.Interfaces;
using AspireApp.Domain.Entities;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace AspireApp.Application.FavouriteGenres.Queries.GetFavouriteGenres
{
    public record GetFavouriteGenresQuery : IRequest<List<CategoryDto>>;

    public class GetFavouriteGenresQueryValidator : AbstractValidator<GetFavouriteGenresQuery>
    {
        private readonly ICurrentUser Service _currentUser ;

        public GetFavouriteGenresQueryValidator(ICurrentUser Service currentUser )
        {
            _currentUser = currentUser;

            RuleFor(x => x)
                .Must(_ => !string.IsNullOrEmpty(_currentUser.UserId))
                .WithMessage("User  must be authenticated to retrieve favorite genres.");
        }
    }

    public class GetFavouriteGenresQueryHandler : IRequestHandler<GetFavouriteGenresQuery, List<CategoryDto>>
    {
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUser Service _currentUser Service;

        public GetFavouriteGenresQueryHandler(IApplicationDbContext context, ICurrentUser Service currentUser Service)
        {
            _context = context;
            _currentUser Service = currentUser Service;
        }

        public async Task<List<CategoryDto>> Handle(GetFavouriteGenresQuery request, CancellationToken cancellationToken)
        {
            var userBooks = await _context.UserBookProgresses
                .Where(ubp => ubp.UserId == _currentUser Service.UserId)
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

            return topCategories;
        }
    }
}
