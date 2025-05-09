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
public class UserBookProgressConfiguration : IEntityTypeConfiguration<UserBookProgress>
{
    public void Configure(EntityTypeBuilder<UserBookProgress> builder)
    {
        builder.ToTable("UserBookProgress");

        builder.HasKey(ubp => ubp.Id);

        builder.HasIndex(ubp => new { ubp.UserId, ubp.BookId })
            .IsUnique();

        builder.Property(ubp => ubp.CurrentPage)
            .IsRequired();

        builder.HasOne(ubp => ubp.Book)
            .WithMany()
            .HasForeignKey(ubp => ubp.BookId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne<ApplicationUser>()
            .WithMany(x=> x.BooksProgress)
            .HasForeignKey(ubp => ubp.UserId)
            .OnDelete(DeleteBehavior.Cascade);

    }
}
