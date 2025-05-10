using AspireApp.Application.BookClubs.Queries.GetPopularBookClubs;
using AspireApp.Application.BookClubs.Queries.SearchBookClubs;
using AspireApp.Application.Common.Models;
using AspireApp.Web.Common.Extensions;
using Microsoft.AspNetCore.Mvc;

namespace AspireApp.Web.Endpoints;

public class BookClubs : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
            .MapGet(GetBookClubs)
            .MapGet(SearchBookClubs,"/Search");
    }

    [ProducesResponseType(typeof(SuccessResponse<IEnumerable<BookClubDto>>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status500InternalServerError)]
    public async Task<IResult> GetBookClubs(ISender sender)
    {
        var res = await sender.Send(new GetPopularBookClubsQuery());
        return res.ToResult();
    }

    [ProducesResponseType(typeof(SuccessResponse<IEnumerable<BookClubDto>>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status400BadRequest)]
    public async Task<IResult> SearchBookClubs([FromQuery] string? keyword, ISender sender)
    {
        if(keyword == null)
        {
            var res2 = await sender.Send(new GetPopularBookClubsQuery());
            return res2.ToResult();
        }

        var res = await sender.Send(new SearchBookClubsQuery(keyword));
        return res.ToResult();
    }
}
