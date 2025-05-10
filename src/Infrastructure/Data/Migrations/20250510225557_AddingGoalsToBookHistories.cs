using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AspireApp.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddingGoalsToBookHistories : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "GoalEndDate",
                table: "BookProgressHistories",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "GoalMessage",
                table: "BookProgressHistories",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "GoalEndDate",
                table: "BookProgressHistories");

            migrationBuilder.DropColumn(
                name: "GoalMessage",
                table: "BookProgressHistories");
        }
    }
}
