using AspireApp.Application.Common.Models;
using AspireApp.Application.FavouriteGenres.Queries.GetFavouriteGenres;
using AspireApp.Domain.Entities;
using AspireApp.Web.Common.Extensions;
using Microsoft.AspNetCore.Mvc;

namespace AspireApp.Web.Endpoints;

public class FavoriteGenres : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
            .MapGet(GetFavoriteGenres);
    }
    [ProducesResponseType(typeof(SuccessResponse<IEnumerable<CategoryDto>>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
    public async Task<IResult> GetFavoriteGenres(ISender sender)
    {
        var res = await sender.Send(new GetFavouriteGenresQuery());
        return res.ToResult();
    }
}
