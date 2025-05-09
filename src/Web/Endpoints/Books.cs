using AspireApp.Application.Books.Queries.GetAllBooks;
using AspireApp.Application.Books.Queries.GetBooksByGenre;
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
            .MapGet(GetPopularBooks, "/popular")
             .MapGet(GetBooksByGenre, "/{genre}")
             .MapGet(GetAllBooks);
    }

    [ProducesResponseType(typeof(SuccessResponse<IEnumerable<PopularBookDto>>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status500InternalServerError)]
    public async Task<IResult> GetPopularBooks(ISender sender)
    {
        var res = await sender.Send(new GetPopularBooksQuery());
        return res.ToResult();
    }


    [ProducesResponseType(typeof(SuccessResponse<IEnumerable<BooksByGenreDto>>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status500InternalServerError)]
    public async Task<IResult> GetBooksByGenre(ISender sender, string genre)
    {
        var res = await sender.Send(new GetBooksByGenreQuery(genre));
        return res.ToResult();
    }

    [ProducesResponseType(typeof(SuccessResponse<IEnumerable<BooksByGenreDto>>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status500InternalServerError)]
    public async Task<IResult> GetAllBooks(ISender sender)
    {
        var res = await sender.Send(new GetAllBooksQuery());
        return res.ToResult();
    }

}
