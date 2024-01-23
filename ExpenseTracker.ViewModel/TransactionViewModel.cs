using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace ExpenseTracker.ViewModel
{
    public class TransactionViewModel
    {
        public int Id { get; set; }

        [Required]
        public int TransactionTypeId { get; set; }

        public string? TransactionType { get; set; }

        [Required]
        public int CategoryId { get; set; }

        public string? Category { get; set; }

        public string Title { get; set; }

        public string? Description { get; set; }

        [Required]
        public decimal Amount { get; set; }

       
        public DateOnly CreationDate { get; set; }
    }
}
