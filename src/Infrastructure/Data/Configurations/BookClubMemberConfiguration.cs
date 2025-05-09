using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AspireApp.Domain.Entities;
using AspireApp.Infrastructure.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AspireApp.Infrastructure.Data.Configurations;
public class BookClubMemberConfiguration : IEntityTypeConfiguration<BookClubMember>
{
    public void Configure(EntityTypeBuilder<BookClubMember> builder)
    {
        builder.ToTable("BookClubMembers");

        builder.HasKey(b => b.Id);

        builder.HasOne(x => x.BookClub)
            .WithMany(x => x.UserBookClubs)
            .HasForeignKey(x => x.BookClubId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne<ApplicationUser>()
            .WithMany(x => x.BookClubs)
            .HasForeignKey(x => x.UserId)
            .OnDelete(DeleteBehavior.Cascade);


    }
}
