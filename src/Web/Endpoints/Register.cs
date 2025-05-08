using AspireApp.Application.UseCases.Accounts.Commands.Register;
using AspireApp.Web.Common.Extensions;

namespace AspireApp.Web.Endpoints;

public class Register : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
            .DisableAntiforgery()
            .MapPost(RegisterUser);
    }

    public async Task<IResult> RegisterUser(RegisterCommand request, ISender sender)
    {
        var res = await sender.Send(request);

        return res.ToResult();
    }

}
