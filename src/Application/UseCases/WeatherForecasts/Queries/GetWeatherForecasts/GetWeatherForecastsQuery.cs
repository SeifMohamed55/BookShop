using System.Collections.Generic;
using AspireApp.Application.Common.Security;
using GraduationProject.Application.Services;

namespace AspireApp.Application.UseCases.WeatherForecasts.Queries.GetWeatherForecasts;

[Authorize]
public record GetWeatherForecastsQuery : IRequest<ServiceResult<IEnumerable<WeatherForecast>>>;

public class GetWeatherForecastsQueryHandler : IRequestHandler<GetWeatherForecastsQuery, ServiceResult<IEnumerable<WeatherForecast>>>
{
    private static readonly string[] Summaries = new[]
    {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
    public async Task<ServiceResult<IEnumerable<WeatherForecast>>> Handle(GetWeatherForecastsQuery request, CancellationToken cancellationToken)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
    {
        var rng = new Random();


        var data = Enumerable.Range(1, 5).Select(index => new WeatherForecast
        {
            Date = DateTime.Now.AddDays(index),
            TemperatureC = rng.Next(-20, 55),
            Summary = Summaries[rng.Next(Summaries.Length)]
        });

        if(data == null)
            return ServiceResult<IEnumerable<WeatherForecast>>.Failure("An error occured");


        return ServiceResult<IEnumerable<WeatherForecast>>.Success(data, "Fetched successfully.");

         
    }
}
