using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AspireApp.Domain.Entities;
using AspireApp.Infrastructure.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AspireApp.Infrastructure.Data.Configurations;
public class BookConfiguration : IEntityTypeConfiguration<Book>
{
    public void Configure(EntityTypeBuilder<Book> builder)
    {
        builder.Property(b => b.Title)
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(b => b.Author)
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(b => b.Description)
            .HasMaxLength(1000)
            .IsRequired();

        builder.Property(b => b.ImagePath)
            .HasMaxLength(500)
            .IsRequired();

        builder.Property(b => b.TotalPages)
            .IsRequired();

        builder.Property(b => b.BookFilePath)
            .HasMaxLength(500)
            .IsRequired();

        builder.HasOne<ApplicationUser>()
            .WithMany(x=> x.PublishedBooks)
            .HasForeignKey(b => b.UserId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasMany(b => b.BookCategories)
            .WithMany(c => c.Books)
            .UsingEntity<BookCategory>(
                j => j
                    .HasOne(bc => bc.Category)
                    .WithMany()
                    .HasForeignKey(bc => bc.CategoryId),
                j => j
                    .HasOne(bc => bc.Book)
                    .WithMany()
                    .HasForeignKey(bc => bc.BookId),
                j =>
                {
                    j.HasKey(t => new { t.BookId, t.CategoryId });
                    j.ToTable("BookCategories");
                }
            );

    }

}
