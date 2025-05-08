using AspireApp.Application.Common.Interfaces;
using AspireApp.Application.Common.Models;
using GraduationProject.Application.Services;

namespace AspireApp.Application.Accounts.Commands.Register;

public class RegisterCommandHandler : IRequestHandler<RegisterCommand, ServiceResult<bool>>
{
    private readonly IIdentityService _identity;
    private readonly IImageStorageService _imageService;

    public RegisterCommandHandler(IIdentityService identity, IImageStorageService imageStorageService)
    {
        _identity = identity;
        _imageService = imageStorageService;
    }

    public async Task<ServiceResult<bool>> Handle(RegisterCommand request, CancellationToken cancellationToken)
    {
        var res  = await _identity.CreateUserAsync(request, IImageStorageService.DefaultUserImageRelativePath);
        if (res.TryGetData(out var data))
        {
            var url = await _imageService.SaveImageAsync(request.Image, request.Extension);

            await _identity.UpdateUserImage(data.Id, url);

            return ServiceResult<bool>.Success(true, "User registered successfully");
        }
        return ServiceResult<bool>.Failure("Couldn't register user");
    }

}
