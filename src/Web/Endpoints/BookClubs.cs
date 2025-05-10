using AspireApp.Application.BookClubs.Queries.GetPopularBookClubs;
using AspireApp.Application.Common.Models;
using AspireApp.Web.Common.Extensions;
using Microsoft.AspNetCore.Mvc;

namespace AspireApp.Web.Endpoints;

public class BookClubs : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
            .MapGet(GetBookClubs);
    }

    [ProducesResponseType(typeof(SuccessResponse<IEnumerable<BookClubDto>>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status500InternalServerError)]
    public async Task<IResult> GetBookClubs(ISender sender)
    {
        var res = await sender.Send(new GetPopularBookClubsQuery());
        return res.ToResult();
    }
}
