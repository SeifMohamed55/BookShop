using AspireApp.Web.Endpoints;
using Microsoft.AspNetCore.Antiforgery;

namespace AspireApp.Web.Common.Middleware;

public class AntiforgeryValidationMiddleware
{
    private readonly RequestDelegate _next;
    private readonly IAntiforgery _antiforgery;

    public AntiforgeryValidationMiddleware(RequestDelegate next, IAntiforgery antiforgery)
    {
        _next = next;
        _antiforgery = antiforgery;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        if (!HttpMethods.IsGet(context.Request.Method) &&
            !HttpMethods.IsHead(context.Request.Method) &&
            !HttpMethods.IsOptions(context.Request.Method) &&
            !HttpMethods.IsTrace(context.Request.Method))
        {
            var path = context.Request.Path.Value ?? "";

            if (!path.StartsWith("/api/v1/login") && !path.StartsWith("/api/v1/register"))
            {
                await _antiforgery.ValidateRequestAsync(context);
            }
        }

        await _next(context);
    }
}

