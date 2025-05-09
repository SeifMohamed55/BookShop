using AspireApp.Application.Common.Models;
using AspireApp.Application.Common.Security;
using AspireApp.Application.UseCases.WeatherForecasts.Queries.GetWeatherForecasts;
using AspireApp.Web.Common.Extensions;
using GraduationProject.Application.Services;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace AspireApp.Web.Endpoints;
public class WeatherForecasts : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this) 
            .MapGet(GetWeatherForecasts);
    }

    [ProducesResponseType(typeof(SuccessResponse<IEnumerable<WeatherForecast>>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status400BadRequest)]
    public async Task<IResult> GetWeatherForecasts(ISender sender)
    {
        var forecasts = await sender.Send(new GetWeatherForecastsQuery());

        return forecasts.ToResult();
    }
}
