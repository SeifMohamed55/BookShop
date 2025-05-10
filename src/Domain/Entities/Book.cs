namespace AspireApp.Domain.Entities;
public class Book : BaseAuditableEntity
{
    public required string Title { get; set; }
    public required string Author { get; set; }
    public required string Description { get; set; } 
    public required string ImagePath { get; set; }
    public required int TotalPages { get; init; }
    public bool IsHidden { get; set; }
    public required string BookFilePath { get; set; }
    public float AverageRating { get; set; } // update by AvgAsync

    public required string UserId { get; set; } 
    public ICollection<Review> Reviews { get; set; } = [];
    public ICollection<Category> Categories { get; set; } = [];

}





