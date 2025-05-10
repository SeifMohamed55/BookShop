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
public class BookProgrssHistoryConfiguration : IEntityTypeConfiguration<BookProgressHistory>
{
    public void Configure(EntityTypeBuilder<BookProgressHistory> builder)
    {
        builder.ToTable("BookProgressHistories");

        builder.HasKey(b => b.Id);

        builder.HasOne(x=> x.Book)
            .WithMany()
            .HasForeignKey(x => x.BookId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(x=> x.UserBookProgress)
            .WithMany(x => x.BookProgressHistories)
            .HasForeignKey(x => x.BookProgressId)
            .OnDelete(DeleteBehavior.NoAction);
    }
}
