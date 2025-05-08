using AspireApp.Application.Common.Models;
using Microsoft.AspNetCore.Antiforgery;

namespace AspireApp.Web.Endpoints;

public class AntiForgery : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this);
            //.MapGet(GetAntiForgeryToken);
    }
    public IResult GetAntiForgeryToken(HttpContext context)
    {
        var tokens = context.RequestServices.GetRequiredService<IAntiforgery>().GetAndStoreTokens(context);

        if(tokens.RequestToken == null)
            return TypedResults.BadRequest(new ErrorResponse("Failed to generate anti-forgery token."));

        return TypedResults
            .Ok(new SuccessResponse<string>(tokens.RequestToken, "Anti-forgery token generated successfully."));
    }
}
