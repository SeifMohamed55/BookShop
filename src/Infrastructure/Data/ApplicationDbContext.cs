using System.Reflection;
using AspireApp.Application.Common.Interfaces;
using AspireApp.Domain.Entities;
using AspireApp.Infrastructure.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace AspireApp.Infrastructure.Data;
public class ApplicationDbContext : IdentityDbContext<ApplicationUser>, IApplicationDbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    public DbSet<Book> Books => Set<Book>();
    public DbSet<Review> Reviews => Set<Review>();
    public DbSet<UserBookProgress> UserBookProgresses => Set<UserBookProgress>();
    public DbSet<BookProgressHistory> BookProgressHistories => Set<BookProgressHistory>();
    public DbSet<Category> Categories => Set<Category>();
    public DbSet<BookClub> BookClubs => Set<BookClub>();
    public DbSet<BookClubMember> BookClubMembers => Set<BookClubMember>();


    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    }

}
