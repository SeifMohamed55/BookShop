using AspireApp.Application.Accounts.Commands.Register;
using AspireApp.Application.Common.Models;

namespace AspireApp.Application.Common.Interfaces;
public interface IIdentityService
{
    Task<string?> GetUserNameAsync(string userId);

    Task<bool> IsInRoleAsync(string userId, string role);

    Task<bool> AuthorizeAsync(string userId, string policyName);

    Task<ApplicationIdentityResult> CreateUserAsync(RegisterCommand model, string imageUrl);

    Task<ApplicationIdentityResult> DeleteUserAsync(string userId);

}
