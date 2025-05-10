using System.Net;
using AspireApp.Application.Common.Interfaces;
using AspireApp.Application.Common.Models;
using GraduationProject.Application.Services;

namespace AspireApp.Application.UseCases.Accounts.Commands.Login;

public class LoginCommandHandler : IRequestHandler<LoginCommand, ServiceResult<UserDto>>
{
    private readonly IIdentityService _identityService;

    public LoginCommandHandler(IIdentityService identityService)
    {
        _identityService = identityService;
    }

    public async Task<ServiceResult<UserDto>> Handle(LoginCommand request, CancellationToken cancellationToken)
    {

        var res = await _identityService.SignInAsync(request);

        return res;
    }
}
