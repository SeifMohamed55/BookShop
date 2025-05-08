using AspireApp.Application.Common.Models;
using AspireApp.Application.Common.Security;
using GraduationProject.Application.Services;

namespace AspireApp.Application.Accounts.Commands.Login;

public record LoginCommand : IRequest<ServiceResult<UserDto>>
{
    public required string Email { get; init; }
    public required string Password { get; init; }
    public bool RememberMe { get; init; } = false;
}
