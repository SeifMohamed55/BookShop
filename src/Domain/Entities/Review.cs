namespace AspireApp.Domain.Entities;

public class Review : BaseAuditableEntity
{
    public byte Rating { get; set; }
    public required string Comment { get; set; } 

    public int BookId { get; set; }
    public Book Book { get; set; } = null!;

    public required string UserId { get; set; }

    public int Likes { get; init; } // update with every like

}





