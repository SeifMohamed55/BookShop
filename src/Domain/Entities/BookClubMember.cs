﻿namespace AspireApp.Domain.Entities;

// Domain/Entities/BookClubMember.cs
public class BookClubMember : BaseEntity
{
    public int BookClubId { get; set; }
    public BookClub BookClub { get; set; } = null!;

    public required string UserId { get; set; } 

    public required DateTime JoinedDate { get; set; }
    public MemberRole Role { get; set; }
}





