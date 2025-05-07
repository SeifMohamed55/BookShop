using System.Net;
using AspireApp.Application.Common.Models;
using GraduationProject.Application.Services;
using Microsoft.AspNetCore.Mvc;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace AspireApp.Web.Common.Extensions;

public static class CommandHandlerResultExtensions
{
    public static IResult ToResult<T>(this CommandHandlerResult<T> result)
    {
        if (result.TryGetData(out var data))
            return TypedResults.Ok(new SuccessResponse<T>(data, result.Message));

        var errorResponse = new ErrorResponse(result.Message, result.Errors);

        return result.StatusCode switch
        {
            HttpStatusCode.BadRequest => Results.BadRequest(errorResponse),
            HttpStatusCode.Unauthorized => Results.Unauthorized(),
            HttpStatusCode.Forbidden => Results.Forbid(),
            HttpStatusCode.NotFound => Results.NotFound(errorResponse),
            HttpStatusCode.InternalServerError => Results.InternalServerError("An unexpected error occurred"),
            _ => Results.StatusCode(((int)result.StatusCode))
        };
    }

}
