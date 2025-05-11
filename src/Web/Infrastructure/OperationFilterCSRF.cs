namespace AspireApp.Web.Infrastructure;

using Microsoft.OpenApi.Models;
using NSwag.AspNetCore.Middlewares;

using NSwag.Generation.Processors;
using NSwag.Generation.Processors.Contexts;
using NJsonSchema;

public class AddCsrfHeaderOperationProcessor : IOperationProcessor
{
    public bool Process(OperationProcessorContext context)
    {
        // Get the HTTP method and operation path
        var method = context.OperationDescription.Method.ToUpperInvariant();
        var path = context.OperationDescription.Path.ToLowerInvariant();

        // Check if this is a method that requires CSRF protection
        bool requiresCsrfProtection = (method == "POST" || method == "PUT" || method == "DELETE");

        // Skip for authentication endpoints (login, register, etc.)
        bool isAuthEndpoint = path.Contains("/login") ||
                              path.Contains("/register") ||
                              path.Contains("/signin") ||
                              path.Contains("/auth/") ||
                              path.Contains("/token");

        // Add CSRF header parameter if needed
        if (requiresCsrfProtection && !isAuthEndpoint)
        {
            var csrfParameter = new NSwag.OpenApiParameter
            {
                Name = "X-XSRF-TOKEN",
                Kind = NSwag.OpenApiParameterKind.Header,
                Schema = new JsonSchema { Type = JsonObjectType.String },
                IsRequired = false,
                Description = "CSRF protection token"
            };

            // Add extension data to mark as internal
            csrfParameter.ExtensionData = csrfParameter.ExtensionData ?? new Dictionary<string, object?>();
            csrfParameter.ExtensionData["x-internal"] = true;

            context.OperationDescription.Operation.Parameters.Add(csrfParameter);
        }

        return true;
    }
}

