namespace AspireApp.Domain.Entities;

public class UserBookProgress : BaseAuditableEntity
{
    public int CurrentPage { get; set; }
    public bool IsCompleted { get; set; } // true if the book is completed

    public int BookId { get; set; }
    public Book Book { get; set; } = null!;

    public ICollection<BookProgressHistory> BookProgressHistories { get; set; } = [];

    public string UserId { get; set; } = null!;

    public void UpdateProgress(int page)
    {
        CurrentPage = page;
        LastModified = DateTime.UtcNow;
    }
}

