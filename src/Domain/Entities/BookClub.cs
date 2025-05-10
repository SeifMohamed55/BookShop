namespace AspireApp.Domain.Entities;

public class BookClub : BaseAuditableEntity
{
    public required string Name { get; set; }
    public required string Description { get; set; }
    public required string ImagePath { get; set; }
    public ICollection<Book> Books { get; set; } = [];
    public ICollection<BookClubMember> UserBookClubs { get; set; } = [];

}





