using AspireApp.Application.Common.Models;
using AspireApp.Application.UseCases.Accounts.Commands.Login;
using AspireApp.Web.Common.Extensions;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Mvc;


namespace AspireApp.Web.Endpoints;

public class Login : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
            .MapPost(LoginUser);
    }

    [ProducesResponseType(typeof(SuccessResponse<UserDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status400BadRequest)]
    public async Task<IResult> LoginUser(LoginCommand command, ISender sender, HttpContext httpContext)
    {
        var res = await sender.Send(command);

        var antiforgery = httpContext.RequestServices.GetRequiredService<IAntiforgery>();
        var tokens = antiforgery.GetAndStoreTokens(httpContext);

        CookieOptions options = new CookieOptions
        {
            HttpOnly = false, // must be accessible by JavaScript
            Secure = true,    // only over HTTPS
            SameSite = SameSiteMode.None
        };
        if(command.RememberMe)
            options.Expires = DateTimeOffset.UtcNow.AddDays(30);


        httpContext.Response.Cookies.Append("XSRF-TOKEN", tokens.RequestToken!, options);

        httpContext.Response.Cookies.Append("isSignedIn", "true", options);

        return res.ToResult();
    }
}

