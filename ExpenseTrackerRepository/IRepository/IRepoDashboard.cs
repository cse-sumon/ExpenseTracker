using ExpenseTracker.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExpenseTracker.Repository.IRepository
{
    public interface IRepoDashboard
    {
        Task<decimal> GetAllIncomeExpense(int id);

    }
}
