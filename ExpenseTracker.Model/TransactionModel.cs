using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExpenseTracker.Model
{
    public class TransactionModel
    {
        public int Id { get; set; }

        [Required]
        public int TransactionTypeId { get; set; }

        [Required]
        public int CategoryId { get; set; }
        public string Title { get; set; }
        public string? Desciption { get; set; }

        [Required]
        [Precision(18, 2)]
        public decimal Amount { get; set; }

        [Required]
        public DateTime CreationDate { get; set; }
    }
}
