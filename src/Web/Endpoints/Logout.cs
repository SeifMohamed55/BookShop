
using AspireApp.Application.Accounts.Commands.Logout;
using AspireApp.Application.Common.Models;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace AspireApp.Web.Endpoints;

public class Logout : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
            .MapPost(LogoutUser);
    }

    [ProducesResponseType(typeof(SuccessResponse<bool>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status400BadRequest)]
    public async Task<IResult> LogoutUser(ISender sender, HttpContext httpContext)
    {
        var res = await sender.Send(new LogoutCommand());

        CookieOptions options = new CookieOptions
        {
            HttpOnly = false, // must be accessible by JavaScript
            Secure = true,    // only over HTTPS
            SameSite = SameSiteMode.None
        };
        httpContext.Response.Cookies.Delete("XSRF-TOKEN", options);
        httpContext.Response.Cookies.Delete("isSignedIn", options);
        return Results.Ok(new SuccessResponse<bool>(true, "User logged out successfully"));
    }
}

