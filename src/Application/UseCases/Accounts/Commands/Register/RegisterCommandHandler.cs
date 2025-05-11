using AspireApp.Application.Common.Interfaces;
using AspireApp.Application.Common.Models;
using GraduationProject.Application.Services;

namespace AspireApp.Application.UseCases.Accounts.Commands.Register;

public class RegisterCommandHandler : IRequestHandler<RegisterCommand, ServiceResult<bool>>
{
    private readonly IIdentityService _identity;
    private readonly IStorageService _imageService;

    public RegisterCommandHandler(IIdentityService identity, IStorageService imageStorageService)
    {
        _identity = identity;
        _imageService = imageStorageService;
    }

    public async Task<ServiceResult<bool>> Handle(RegisterCommand request, CancellationToken cancellationToken)
    {
        var res  = await _identity.CreateUserAsync(request, IStorageService.DefaultUserImageRelativePath);
        if (res.TryGetData(out var data))
        {
            if (!string.IsNullOrEmpty(request.Image))
            {
                var url = await _imageService.SaveImageAsync(request.Image, FileType.UserImage);

                await _identity.UpdateUserImage(data.Id, url);
            }

            return ServiceResult<bool>.Success(true, "Email created successfully");
        }
        return ServiceResult<bool>.Failure("Couldn't register user", res.Errors);
    }

}
