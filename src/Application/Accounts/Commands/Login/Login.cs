using System.Net;
using AspireApp.Application.Common.Interfaces;
using AspireApp.Application.Common.Models;

namespace AspireApp.Application.Accounts.Commands.Login;

public record LoginCommand : IRequest<UserDto>
{
    public required string Email { get; init; }
    public required string Password { get; init; }
    public bool RememberMe { get; init; } = false;
}

public class LoginCommandValidator : AbstractValidator<LoginCommand>
{
    public LoginCommandValidator()
    {
        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email is required.")
            .EmailAddress().WithMessage("Invalid email format.");
        RuleFor(x => x.Password)
            .NotEmpty().WithMessage("Password is required.")
            .MinimumLength(6).WithMessage("Password must be at least 6 characters long.");
    }
}

public class LoginCommandHandler : IRequestHandler<LoginCommand, UserDto>
{
    private readonly IIdentityService _identityService;

    public LoginCommandHandler(IIdentityService identityService)
    {
        _identityService = identityService;
    }

    public async Task<UserDto> Handle(LoginCommand request, CancellationToken cancellationToken)
    {

        return await Task.Run(() => 
            new UserDto
            {
                Id = request.Email,
                ImageUrl = "https://example.com/image.jpg",
                Email = request.Email,
                FullName = "John Doe"
            }
        );
    }
}
