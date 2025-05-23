﻿using AspireApp.Application.Common.Interfaces;
using AspireApp.Domain.Constants;
using AspireApp.Domain.Entities;
using AspireApp.Infrastructure.FileStorage;
using AspireApp.Infrastructure.Identity;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace AspireApp.Infrastructure.Data;
public static class InitialiserExtensions
{
    public static async Task InitialiseDatabaseAsync(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();

        var initialiser = scope.ServiceProvider.GetRequiredService<ApplicationDbContextInitialiser>();

        await initialiser.InitialiseAsync();

        await initialiser.SeedAsync();
    }
}

public class ApplicationDbContextInitialiser
{
    private readonly ILogger<ApplicationDbContextInitialiser> _logger;
    private readonly ApplicationDbContext _context;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;

    public ApplicationDbContextInitialiser(ILogger<ApplicationDbContextInitialiser> logger, ApplicationDbContext context, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
    {
        _logger = logger;
        _context = context;
        _userManager = userManager;
        _roleManager = roleManager;
    }

    public async Task InitialiseAsync()
    {
        try
        {
            await Task.CompletedTask;
            await _context.Database.MigrateAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while initialising the database.");
            throw;
        }
    }

    public async Task SeedAsync()
    {
        try
        {
            await TrySeedAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while seeding the database.");
            throw;
        }
    }

    public async Task TrySeedAsync()
    {
        // Default roles
        var administratorRole = new IdentityRole(Roles.Administrator);

        if (_roleManager.Roles.All(r => r.Name != administratorRole.Name))
        {
            await _roleManager.CreateAsync(administratorRole);
        }

        // Default users
        var administrator = new ApplicationUser 
        {
            UserName = "administrator@localhost",
            Email = "administrator@localhost" ,
            FullName = "Adminstrator",
            ImageUrl = IStorageService.DefaultUserImageRelativePath
        };

        if (_userManager.Users.All(u => u.UserName != administrator.UserName))
        {
            await _userManager.CreateAsync(administrator, "Administrator1!");
            if (!string.IsNullOrWhiteSpace(administratorRole.Name))
            {
                await _userManager.AddToRolesAsync(administrator, new[] { administratorRole.Name });
            }
        }

        if (!_context.Categories.Any())
        {
            await _context.Categories.AddRangeAsync([
                new Category { Name = "Fiction" },
                new Category { Name = "Non-Fiction" },
                new Category { Name = "Science Fiction" },
                new Category { Name = "Fantasy" },
                new Category { Name = "Mystery" },
                new Category { Name = "Biography" },
                new Category { Name = "Self-Help" },
                new Category { Name = "History" },
                new Category { Name = "Poetry" },
                new Category { Name = "Romance" },
                new Category { Name = "Thriller" },
                new Category { Name = "Health & Wellness" },
                new Category { Name = "Business" },
                new Category { Name = "Education" },
                new Category { Name = "Children's Books" },
                new Category { Name = "Young Adult" },
                new Category { Name = "Philosophy" },
                new Category { Name = "Travel" },
                new Category { Name = "Cooking" },
                new Category { Name = "Spirituality" },
                new Category { Name = "Comics & Graphic Novels" }
            ]);

            await _context.SaveChangesAsync();
        }

        if(!_context.BookClubs.Any())
        {
            var user = await _context.Users.OrderBy(x=> x.Id).FirstAsync();
            var user2 = await _context.Users.OrderBy(x => x.Id).LastAsync();
            var bookClub = new BookClub
            {
                Name = "Book Lovers Club",
                Description = "A club for book lovers to discuss their favorite books.",
                ImagePath = "",
                UserBookClubs = new List<BookClubMember>
                {
                    new BookClubMember
                    {
                        UserId = user.Id,
                        Role = Domain.Enums.MemberRole.Admin,
                        JoinedDate = DateTime.UtcNow,
                    },
                    new BookClubMember
                    {
                        UserId = user2.Id,
                        Role = Domain.Enums.MemberRole.Member,
                        JoinedDate = DateTime.UtcNow,
                    }
                }
            };
            _context.BookClubs.Add(bookClub);
            await _context.SaveChangesAsync();
        }

        /*if (!_context.Reviews.Any())
        {
            var book = await _context.Books.FirstAsync();
            var user = await _context.Users.FirstAsync();

            _context.Reviews.AddRange(new List<Review>
            {
                new Review
                {
                    UserId = user.Id,
                    Rating = 5,
                    Comment = "An amazing book! Highly recommend it.",
                    Book = book,
                    Likes = 10
                },
                new Review
                {
                    UserId = user.Id,
                    Rating = 4,
                    Comment = "Good book has better.",
                    Book = book,
                    Likes = 0
                }
            });

            await _context.SaveChangesAsync();
        }*/

    }
}
