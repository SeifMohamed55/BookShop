using AspireApp.Application.BookClubs.Queries.GetPopularBookClubs;
using AspireApp.Application.Common.Models;
using AspireApp.Web.Common.Extensions;
using Microsoft.AspNetCore.Mvc;

namespace AspireApp.Web.Endpoints;

public class ReadingStats : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
            .MapGet(GetReadingStats);
    }

    [ProducesResponseType(typeof(SuccessResponse<IEnumerable<ReadingStatsDto>>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status500InternalServerError)]
    public async Task<IResult> GetReadingStats(ISender sender)
    {
        var res = await sender.Send(new GetReadingRatioQuery());
        return res.ToResult();
    }
}
