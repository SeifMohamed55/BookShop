namespace AspireApp.Domain.Entities;

public class BookProgressHistory : BaseAuditableEntity
{
    public int StartPage { get; set; }
    public int EndPage { get; set; }

    public string GoalMessage { get; set; } = null!;

    public int BookId { get; set; }
    public required Book Book { get; set; }

    public DateTime GoalEndDate { get; set; }

    public int BookProgressId { get; set; } 
    public UserBookProgress UserBookProgress { get; set; } = null!;
}





