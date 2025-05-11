using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AspireApp.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AspireApp.Infrastructure.Data.Configurations;
public class BookClubConfiguration : IEntityTypeConfiguration<BookClub>
{
    public void Configure(EntityTypeBuilder<BookClub> builder)
    {
        builder.ToTable("BookClubs");

        builder.HasKey(b => b.Id);

        builder.Property(b => b.Name)
            .IsRequired()
            .HasMaxLength(100);

        builder.HasMany(x => x.Books)
            .WithMany();
            
    }
}
