﻿using AspireApp.Domain.Entities;
using AspireApp.Infrastructure.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AspireApp.Infrastructure.Data.Configurations;
public class BookConfiguration : IEntityTypeConfiguration<Book>
{
    public void Configure(EntityTypeBuilder<Book> builder)
    {
        builder.ToTable("Books");

        builder.HasKey(x => x.Id);

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
            .OnDelete(DeleteBehavior.Restrict);


        builder.HasMany(b => b.Categories)
            .WithMany(c => c.Books);
            


    }

}
