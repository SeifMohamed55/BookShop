using AspireApp.Application.Accounts.Commands.Login;
using AspireApp.Web.Common.Extensions;
using Microsoft.AspNetCore.Antiforgery;


namespace AspireApp.Web.Endpoints;

public class Login : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
            .MapPost(LoginUser);
    }
    public async Task<IResult> LoginUser(LoginCommand command, ISender sender, HttpContext httpContext)
    {
        var res = await sender.Send(command);

        var request = httpContext.Request;
        var baseUrl = $"{request.Scheme}://{request.Host}";
        
        if(res.TryGetData(out var data))
           data.ImageUrl = $"{baseUrl}/{data.ImageUrl.TrimStart('/')}";

        var antiforgery = httpContext.RequestServices.GetRequiredService<IAntiforgery>();
        var tokens = antiforgery.GetAndStoreTokens(httpContext);

        httpContext.Response.Cookies.Append("XSRF-TOKEN", tokens.RequestToken!, new CookieOptions
        {
            HttpOnly = false, // must be accessible by JavaScript
            Secure = true,    // only over HTTPS
            SameSite = SameSiteMode.None
        });

        return res.ToResult();
    }
}

