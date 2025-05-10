namespace AspireApp.Domain.Entities;

public class Category : BaseEntity
{
    public required string Name { get; set; }
    public ICollection<Book> Books { get; set; } = [];
}





