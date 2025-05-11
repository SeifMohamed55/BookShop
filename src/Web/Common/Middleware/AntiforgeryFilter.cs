using AspireApp.Application.Common.Models;
using Microsoft.AspNetCore.Antiforgery;

namespace AspireApp.Web.Common.Middleware;
public class AntiforgeryFilter : IEndpointFilter
{
    private readonly IAntiforgery _antiforgery;

    public AntiforgeryFilter(IAntiforgery antiforgery)
    {
        _antiforgery = antiforgery;
    }

    public async ValueTask<object?> InvokeAsync(EndpointFilterInvocationContext context, EndpointFilterDelegate next)
    {
        var request = context.HttpContext.Request;

        // Skip validation for GET requests
        if (string.Equals(request.Method, "GET", StringComparison.OrdinalIgnoreCase))
        {
            return await next(context);
        }

        // Get the endpoint path (lowercase for easier comparison)
        var path = request.Path.Value?.ToLowerInvariant() ?? string.Empty;

        // Skip validation for login or register paths
        if (path.Contains("/login") || path.Contains("/register"))
        {
            return await next(context);
        }

        // Perform antiforgery validation
        try
        {
            await _antiforgery.ValidateRequestAsync(context.HttpContext);
        }
        catch (AntiforgeryValidationException)
        {
            return Results.BadRequest(new ErrorResponse("Invalid AntiForgery token. Please refresh the page and try again."));
        }

        return await next(context);
    }
}

