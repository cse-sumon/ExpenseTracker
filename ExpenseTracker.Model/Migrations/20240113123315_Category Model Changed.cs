using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ExpenseTracker.Model.Migrations
{
    /// <inheritdoc />
    public partial class CategoryModelChanged : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateOnly>(
                name: "CreationDate",
                table: "Category",
                type: "date",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "CreationDate",
                table: "Category",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(DateOnly),
                oldType: "date");
        }
    }
}
