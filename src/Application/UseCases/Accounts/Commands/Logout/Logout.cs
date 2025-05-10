using AspireApp.Application.Common.Interfaces;
using GraduationProject.Application.Services;

namespace AspireApp.Application.Accounts.Commands.Logout;

public record LogoutCommand : IRequest<ServiceResult<bool>>
{
}

public class LogoutCommandValidator : AbstractValidator<LogoutCommand>
{
    public LogoutCommandValidator()
    {
    }
}

public class LogoutCommandHandler : IRequestHandler<LogoutCommand, ServiceResult<bool>>
{
    private readonly IIdentityService _identity;

    public LogoutCommandHandler(IIdentityService identity)
    {
         _identity = identity;
    }

    public async Task<ServiceResult<bool>> Handle(LogoutCommand request, CancellationToken cancellationToken)
    {
        return await _identity.SignOutAsync();
    }
}
