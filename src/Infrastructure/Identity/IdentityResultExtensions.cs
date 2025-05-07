using AspireApp.Application.Common.Models;
using Microsoft.AspNetCore.Identity;

namespace AspireApp.Infrastructure.Identity;
public static class IdentityResultExtensions
{
    public static ApplicationIdentityResult ToApplicationResult(this IdentityResult result)
    {
        return result.Succeeded
            ? ApplicationIdentityResult.Success()
            : ApplicationIdentityResult.Failure(result.Errors.Select(e => e.Description));
    }
}
