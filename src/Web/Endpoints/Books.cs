using AspireApp.Application.Books.Commands.AddBook;
using AspireApp.Application.Books.Queries.GetAllBooks;
using AspireApp.Application.Books.Queries.GetBooksByGenre;
using AspireApp.Application.Books.Queries.GetPopularBooks;
using AspireApp.Application.Books.Queries.GetMyBooks;
using AspireApp.Application.Common.Models;
using AspireApp.Web.Common.Extensions;
using GraduationProject.Application.Services;
using Microsoft.AspNetCore.Mvc;
using AspireApp.Application.Books.Queries.GetMostPopularBook;
using AspireApp.Application.Books.Queries.GetBookById;
using AspireApp.Application.Books.Queries.GetBookPage;
using AspireApp.Application.UserBookProgresses.Commands.AddUserBookProgress;
using AspireApp.Application.Books.Queries.GetBookReviews;
namespace AspireApp.Web.Endpoints;

public class Books : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
            .MapGet(GetPopularBooks, "/popular")
            .MapGet(GetBooksByGenre, "/{genre}")
            .MapGet(GetAllBooks)
            .MapGet(GetMyBooks, "/my")
            .MapGet(GetMostPopularBook, "/most-popular")
            .MapGet(GetBookById, "/book")
            .MapGet(GetBookPage, "/page")
            .MapGet(GetBookReviews, "/reviews")
            .MapPost(AddBook)
            .MapPost(AddToLibrary, "/progress");
    }

    [ProducesResponseType(typeof(SuccessResponse<IEnumerable<ReviewDto>>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
    public async Task<IResult> GetBookReviews(ISender sender, [FromQuery] int bookId)
    {
        var res = await sender.Send(new GetBookReviewsQuery(bookId));
        return res.ToResult();
    }


    [ProducesResponseType(typeof(SuccessResponse<BookPageDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
    public async Task<IResult> GetBookPage(ISender sender, [FromQuery] int bookId, [FromQuery] int page)
    {
        var res = await sender.Send(new GetBookPageQuery(bookId, page));
        return res.ToResult();
    }


    [ProducesResponseType(typeof(SuccessResponse<BookDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
    public async Task<IResult> GetBookById(ISender sender, [FromQuery] int id)
    {
        var res = await sender.Send(new GetBookByIdQuery(id));
        return res.ToResult();
    }

    [ProducesResponseType(typeof(SuccessResponse<IEnumerable<PopularBookDto>>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status500InternalServerError)]
    public async Task<IResult> GetPopularBooks(ISender sender)
    {
        var res = await sender.Send(new GetPopularBooksQuery());
        return res.ToResult();
    }


    [ProducesResponseType(typeof(SuccessResponse<IEnumerable<BooksByGenreDto>>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status400BadRequest)]
    public async Task<IResult> GetBooksByGenre(ISender sender, string genre)
    {
        var res = await sender.Send(new GetBooksByGenreQuery(genre));
        return res.ToResult();
    }

    [ProducesResponseType(typeof(SuccessResponse<IEnumerable<BooksByGenreDto>>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status400BadRequest)]
    public async Task<IResult> GetAllBooks(ISender sender)
    {
        var res = await sender.Send(new GetAllBooksQuery());
        return res.ToResult();
    }

    [ProducesResponseType(typeof(SuccessResponse<ServiceResult<int>>), StatusCodes.Status201Created)]
    [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status400BadRequest)]
    public async Task<IResult> AddBook(ISender sender, AddBookCommand command)
    {
        var res = await sender.Send(command);
        return res.ToResult();
    }

    [ProducesResponseType(typeof(SuccessResponse<IEnumerable<MyBooksDto>>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status400BadRequest)]
    public async Task<IResult> GetMyBooks(ISender sender, [FromQuery] string userId, [FromQuery] bool? isCompleted)
    {
        var result = await sender.Send(new GetMyBooksQuery(userId, isCompleted));
        return result.ToResult();
    }

    [ProducesResponseType(typeof(SuccessResponse<BookDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
    public async Task<IResult> GetMostPopularBook(ISender sender)
    {
        var result = await sender.Send(new GetMostPopularBookQuery());
        return result.ToResult();

    }

    [ProducesResponseType(typeof(SuccessResponse<ServiceResult<bool>>), StatusCodes.Status201Created)]
    [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status400BadRequest)]
    public async Task<IResult> AddToLibrary(ISender sender, AddUserBookProgressCommand command)
    {
        var res = await sender.Send(command);
        return res.ToResult();
    }
}
