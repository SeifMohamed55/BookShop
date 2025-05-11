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

        builder.HasKey(x=> x.Id);

        builder.HasIndex(bp => new { bp.BookId, bp.UserId });
        builder.HasOne(bp => bp.Book)
            .WithMany()
            .HasForeignKey(bp => bp.BookId);

        builder.HasOne<ApplicationUser>()
            .WithMany(u => u.BooksProgress)
            .HasForeignKey(bp => bp.UserId);

    }
}
