using AspireApp.Application.Common.Models;
using AspireApp.Application.UseCases.Accounts.Commands.Register;
using AspireApp.Web.Common.Extensions;
using Microsoft.AspNetCore.Mvc;

namespace AspireApp.Web.Endpoints;

public class Register : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
            .DisableAntiforgery()
            .MapPost(RegisterUser);
    }

    [ProducesResponseType(typeof(SuccessResponse<bool>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status400BadRequest)]
    public async Task<IResult> RegisterUser(RegisterCommand request, ISender sender)
    {
        var res = await sender.Send(request);

        return res.ToResult();
    }

}
