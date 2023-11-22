using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExpenseTracker.Model
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
                
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TransactionTypeModel>().HasData(
            new TransactionTypeModel()
            {
                Id = 1,
                Name = "Income"
            },
             new TransactionTypeModel()
             {
                 Id = 2,
                 Name = "Expense"
             });

        }


        public DbSet<TransactionTypeModel> TransactionTypes { get; set; }




    }
}
