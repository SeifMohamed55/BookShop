using System.Reflection.PortableExecutable;
using AspireApp.Application.Common.Models;
using AspireApp.Infrastructure.Data;
using AspireApp.Web.Common.Middleware;
using Microsoft.AspNetCore.Authentication.Cookies;

var builder = WebApplication.CreateBuilder(args);

DotNetEnv.Env.Load();
builder.Configuration.AddEnvironmentVariables();

// Add services to the container.
builder.AddServiceDefaults();
builder.AddKeyVaultIfConfigured();
builder.AddApplicationServices();
builder.AddInfrastructureServices();
builder.AddWebServices();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    await app.InitialiseDatabaseAsync();
}
else
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseSwaggerUi(settings =>
{
    settings.Path = "/api";
    settings.DocumentPath = "/api/specification.json";
});


app.UseExceptionHandler(opt => { });

app.UseAuthentication();    // 2. Set the User.Identity

app.UseMiddleware<AntiforgeryValidationMiddleware>();

app.UseAuthorization();     // 3. Check if the user is allowed

app.UseAntiforgery();       // 4. Validate CSRF tokens (for unsafe methods)

app.MapEndpoints();         // 5. Handle requests

app.MapFallbackToFile("index.html");

app.Run();

public partial class Program { }
