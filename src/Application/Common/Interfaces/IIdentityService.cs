using AspireApp.Application.Common.Models;
using AspireApp.Application.UseCases.Accounts.Commands.Login;
using AspireApp.Application.UseCases.Accounts.Commands.Register;
using GraduationProject.Application.Services;

namespace AspireApp.Application.Common.Interfaces;
public interface IIdentityService
{
    Task<string?> GetUserNameAsync(string userId);

    Task<bool> IsInRoleAsync(string userId, string role);

    Task<bool> AuthorizeAsync(string userId, string policyName);

    Task<ServiceResult<UserDto>> CreateUserAsync(RegisterCommand model, string imageUrl);

    Task<ServiceResult<bool>> DeleteUserAsync(string userId);

    Task<ServiceResult<UserDto>> SignInAsync(LoginCommand command);

    Task<ServiceResult<bool>> UpdateUserImage(string userId, string url);

    Task<UserDto> GetRandomUser();

    Task<ServiceResult<bool>> SignOutAsync();

    Task<ServiceResult<UserDto>> GetUserDtoById(string userId);

}
