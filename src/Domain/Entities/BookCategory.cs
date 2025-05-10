namespace AspireApp.Domain.Entities;

public class BookCategory : BaseEntity
{
    public int BookId { get; set; }
    public required Book Book { get; set; }
    public int CategoryId { get; set; }
    public required Category Category { get; set; }
}





