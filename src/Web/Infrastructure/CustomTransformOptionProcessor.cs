using NSwag.Generation.Processors.Contexts;
using NSwag.Generation.Processors;

namespace AspireApp.Web.Infrastructure;

public class CustomTransformOptionsProcessor : IOperationProcessor
{
    public bool Process(OperationProcessorContext context)
    {
        var operation = context.OperationDescription.Operation;

        // Look for operations that should have conditional transform logic
        foreach (var param in operation.Parameters)
        {
            // Check if the operation or parameter is tagged with something like `isExternal`
            // Add any custom logic to mark whether this transformation should be skipped
            param.ExtensionData = param.ExtensionData ?? new Dictionary<string, object?>();
            param.ExtensionData.TryGetValue("x-internal", out object? x_internal) ;

            if (x_internal != null && (bool)x_internal == true)
            {
                // Modify the generated code based on the "isExternal" logic
                param.ExtensionData["x-transform-options-skip"] = true;
            }
        }

        return true;
    }
}
