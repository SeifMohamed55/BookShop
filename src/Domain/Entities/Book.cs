namespace AspireApp.Domain.Entities;
public class Book : BaseAuditableEntity
{
    public required string Title { get; set; }
    public required string Author { get; set; }
    public required string Description { get; set; } 
    public required string ImagePath { get; set; }
    public required int TotalPages { get; set; }
    public required bool IsHidden { get; set; }
    public required string BookFilePath { get; set; }

    public required string UserId { get; set; } 
    public ICollection<Review> Reviews { get; set; } = [];
    public ICollection<Category> BookCategories { get; set; } = [];

}

public class Review : BaseAuditableEntity
{
    public byte Rating { get; set; }
    public required string Comment { get; set; } 

    public int BookId { get; set; }
    public required Book Book { get; set; }

    public required string UserId { get; set; }

    public int Likes { get; init; } // HasComputedColumn
    public int Dislikes { get; init; } // HasComputedColumn


    public ICollection<ReviewLikeDislike> ReviewLikeDislikes { get; set; } = [];
}

public class ReviewLikeDislike : BaseAuditableEntity
{
    public bool IsLike { get; set; } // true for like, false for dislike

    public int ReviewId { get; set; }
    public required Review Review { get; set; }

    public required string UserId { get; set; }
}

public class UserBookProgress : BaseAuditableEntity
{
    public int CurrentPage { get; set; }
    public bool IsCompleted { get; set; } // true if the book is completed

    public int BookId { get; set; }
    public required Book Book { get; set; }

    public required string UserId { get; set; }

    public void UpdateProgress(int page)
    {
        CurrentPage = page;
        LastModified = DateTime.UtcNow;
    }
}

public class BookProgressHistory : BaseAuditableEntity
{
    public int StartPage { get; set; }
    public int EndPage { get; set; }

    public int BookId { get; set; }
    public required Book Book { get; set; }

    public required string UserId { get; set; }
}

public class BookCategory : BaseEntity
{
    public int BookId { get; set; }
    public required Book Book { get; set; }
    public int CategoryId { get; set; }
    public required Category Category { get; set; }
}

public class Category : BaseEntity
{
    public required string Name { get; set; }
    public ICollection<Book> Books { get; set; } = [];
}

public class BookClub : BaseAuditableEntity
{
    public required string Name { get; set; }
    public required string Description { get; set; }
    public required string ImagePath { get; set; }
    public ICollection<Book> Books { get; set; } = [];
    public ICollection<BookClubMember> UserBookClubs { get; set; } = [];

}

// Domain/Entities/BookClubMember.cs
public class BookClubMember : BaseEntity
{
    public int BookClubId { get; set; }
    public required BookClub BookClub { get; set; }

    public required string UserId { get; set; } 

    public DateTime JoinedDate { get; set; }
    public MemberRole Role { get; set; }
}

public enum MemberRole
{
    Member,
    Admin
}





