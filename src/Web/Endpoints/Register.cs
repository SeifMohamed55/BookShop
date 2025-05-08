using AspireApp.Application.Accounts.Commands.Register;
using AspireApp.Web.Common.Extensions;
using AspireApp.Web.Requests;
using Microsoft.AspNetCore.Http.HttpResults;
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
    public async Task<IResult> RegisterUser([FromForm] RegisterRequest request, ISender sender)
    {
        byte[] imageBytes = Array.Empty<byte>();

        if(request.Image != null)
            imageBytes = await GetBytesAsync(request.Image);

        var command = new RegisterCommand
        {
            Fullname = request.Fullname,
            Email = request.Email,
            Password = request.Password,
            ConfirmPassword = request.ConfirmPassword,
            Image = imageBytes,
            ContentType = request.Image?.ContentType ?? "image/jpeg",
            Extension = Path.GetExtension(request.Image?.FileName) ?? ".jpg"
        };

        var res = await sender.Send(command);


        return res.ToResult();
    }

    private async Task<byte[]> GetBytesAsync(IFormFile file)
    {
        using var ms = new MemoryStream();
        await file.CopyToAsync(ms);
        return ms.ToArray();
    }
}
