
using AspireApp.Application.Categories.Queries.GetCategories;
using AspireApp.Application.Categories.Queries.GetTop3Categories;
using AspireApp.Application.Common.Models;
using AspireApp.Domain.Entities;
using AspireApp.Web.Common.Extensions;
using Microsoft.AspNetCore.Mvc;

namespace AspireApp.Web.Endpoints;

public class Categories : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this);
    }

    [ProducesResponseType(typeof(SuccessResponse<IEnumerable<CategoryDto>>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status400BadRequest)]
    public async Task<IResult> GetCategories(ISender sender)
    {
        var res = await sender.Send(new GetCategoriesQuery());
        return res.ToResult();
    }

    [ProducesResponseType(typeof(SuccessResponse<IEnumerable<CategoryDto>>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status400BadRequest)]
    public async Task<IResult> GetTop3Categories(ISender sender)
    {
        var res = await sender.Send(new GetTop3CategoriesQuery());
        return res.ToResult();
    }
}
