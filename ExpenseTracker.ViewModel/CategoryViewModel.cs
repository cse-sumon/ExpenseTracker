using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExpenseTracker.ViewModel
{
    public class CategoryViewModel
    {
        public int Id { get; set; }

        [Required]
        public int TransactionTypeId { get; set; }

        public string? TransactionType { get; set; }

        [Required]
        public string Name { get; set; }

        public string? Description { get; set; }

        public string? Icon { get; set; }

        public IFormFile File { get; set; }

        public DateTime CreationDate { get; set; }
    }
}
