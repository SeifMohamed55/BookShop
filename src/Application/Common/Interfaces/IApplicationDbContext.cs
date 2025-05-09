using AspireApp.Domain.Entities;

namespace AspireApp.Application.Common.Interfaces;
public interface IApplicationDbContext
{
    DbSet<TodoList> TodoLists { get; }

    DbSet<TodoItem> TodoItems { get; }

    // Add your new entities
    public DbSet<Book> Books  { get;}
    public DbSet<Review> Reviews    { get;}
    public DbSet<UserBookProgress> UserBookProgresses   { get;}
    public DbSet<BookProgressHistory> BookProgressHistories { get;}
    public DbSet<BookCategory> BookCategories   { get;}
    public DbSet<Category> Categories   { get;}
    public DbSet<BookClub> BookClubs    { get;}
    public DbSet<BookClubMember> BookClubMembers { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}
