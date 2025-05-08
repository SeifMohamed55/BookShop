using AspireApp.Web.Endpoints;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Mvc.ViewFeatures;

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
        var endpoint = context.GetEndpoint();
        var antiforgeryMetadata = endpoint?.Metadata.GetMetadata<IAntiforgeryMetadata>();

        if (antiforgeryMetadata != null && antiforgeryMetadata.RequiresValidation == false)
        {
            await _next(context);
            return;
        }

        if (HttpMethods.IsPost(context.Request.Method) ||
            HttpMethods.IsPut(context.Request.Method) ||
            HttpMethods.IsDelete(context.Request.Method))
        {
            await _antiforgery.ValidateRequestAsync(context);
        }

        await _next(context);
    }
}


