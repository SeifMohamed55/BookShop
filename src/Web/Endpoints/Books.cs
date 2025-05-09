using AspireApp.Application.Books.Queries.GetPopularBooks;
using AspireApp.Application.Common.Models;
using AspireApp.Web.Common.Extensions;
using Microsoft.AspNetCore.Mvc;

namespace AspireApp.Web.Endpoints;

public class Books : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
            .MapGet(GetPopularBooks, "/popular");
    }

    [ProducesResponseType(typeof(SuccessResponse<IEnumerable<PopularBookDto>>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status500InternalServerError)]
    public async Task<IResult> GetPopularBooks(ISender sender)
    {
        var res = await sender.Send(new GetPopularBooksQuery());
        return res.ToResult();
    }
}
