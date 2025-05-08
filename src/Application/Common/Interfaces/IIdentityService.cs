using AspireApp.Application.Accounts.Commands.Login;
using AspireApp.Application.Accounts.Commands.Register;
using AspireApp.Application.Common.Models;
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

}
