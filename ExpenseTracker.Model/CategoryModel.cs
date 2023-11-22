using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExpenseTracker.Model
{
    public class CategoryModel
    {
        public int Id { get; set; }

        [Required]
        public int TransactionTypeId { get; set; }

        [Required]
        public string Name { get; set; }

        public string Description { get; set; }

        public string Icon { get; set; }

        public DateTime CreationDate { get; set; }
    }
}
