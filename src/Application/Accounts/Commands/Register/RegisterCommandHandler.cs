using AspireApp.Application.Common.Interfaces;
using AspireApp.Application.Common.Models;
using GraduationProject.Application.Services;

namespace AspireApp.Application.Accounts.Commands.Register;

public class RegisterCommandHandler : IRequestHandler<RegisterCommand, CommandHandlerResult<bool>>
{
    private readonly IIdentityService _identity;
    private readonly IImageStorageService _imageService;

    public RegisterCommandHandler(IIdentityService identity, IImageStorageService imageStorageService)
    {
        _identity = identity;
        _imageService = imageStorageService;
    }

    public async Task<CommandHandlerResult<bool>> Handle(RegisterCommand request, CancellationToken cancellationToken)
    {
        var url = await _imageService.SaveImageAsync(request.Image, request.Extension);

        var res  = await _identity.CreateUserAsync(request, url);
        if (res.Succeeded)
        {
            return CommandHandlerResult<bool>.Success(true, "User registered successfully");
        }
        return CommandHandlerResult<bool>.Failure("Couldn't register user", res);
    }


}
