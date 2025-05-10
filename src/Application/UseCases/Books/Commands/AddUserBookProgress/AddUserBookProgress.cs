using AspireApp.Application.Common.Interfaces;
using AspireApp.Application.Common.Models;
using AspireApp.Domain.Entities;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using GraduationProject.Application.Services;

namespace AspireApp.Application.UserBookProgresses.Commands.AddUserBookProgress;

// ✅ Command with required properties
public record AddUserBookProgressCommand(int BookId, int CurrentPage = 0) : IRequest<ServiceResult<bool>>;

public class AddUserBookProgressCommandValidator : AbstractValidator<AddUserBookProgressCommand>
{
    public AddUserBookProgressCommandValidator()
    {
        RuleFor(x => x.BookId).GreaterThan(0);
        RuleFor(x => x.CurrentPage).GreaterThanOrEqualTo(0);
    }
}

public class AddUserBookProgressCommandHandler : IRequestHandler<AddUserBookProgressCommand, ServiceResult<bool>>
{
    private readonly IApplicationDbContext _context;
    private readonly IUser _user;

    public AddUserBookProgressCommandHandler(
        IApplicationDbContext context,
        IUser user)
    {
        _context = context;
        _user = user;
    }

    public async Task<ServiceResult<bool>> Handle(AddUserBookProgressCommand request, CancellationToken cancellationToken)
    {
        var userId = _user.Id; // ✅ Get authenticated user
        if (string.IsNullOrWhiteSpace(userId))
        {
            return ServiceResult<bool>.Failure("Unauthorized access.");
        }

        // ✅ Check if the book exists
        var book = await _context.Books
            .FirstOrDefaultAsync(b => b.Id == request.BookId, cancellationToken);

        if (book == null)
        {
            return ServiceResult<bool>.Failure($"Book with ID {request.BookId} does not exist.");
        }

        var existingProgress = await _context.UserBookProgresses
            .Include(p => p.Book)
            .FirstOrDefaultAsync(p => p.UserId == userId && p.BookId == request.BookId, cancellationToken);

        if (existingProgress == null)
        {
            var newProgress = new UserBookProgress
            {
                UserId = userId,
                BookId = request.BookId,
                CurrentPage = 0,
                IsCompleted = false
            };

            _context.UserBookProgresses.Add(newProgress);
            await _context.SaveChangesAsync(cancellationToken);
            return ServiceResult<bool>.Success(true, "Progress added.");
        }

        existingProgress.UpdateProgress(request.CurrentPage);

        if (existingProgress.CurrentPage >= book.TotalPages)
        {
            existingProgress.IsCompleted = true;
        }

        await _context.SaveChangesAsync(cancellationToken);
        return ServiceResult<bool>.Success(true, "Progress updated.");
    }

}
