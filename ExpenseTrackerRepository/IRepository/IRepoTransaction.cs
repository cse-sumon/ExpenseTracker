using ExpenseTracker.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExpenseTracker.Repository.IRepository
{
    public interface IRepoTransaction
    {
        Task<IEnumerable<TransactionViewModel>> GetAllTransactions();

        Task<TransactionViewModel> GetTransaction(int id);

        Task<IEnumerable<TransactionViewModel>> GetTransactionByTypeId(int id);

        Task AddTransaction(TransactionViewModel transaction); 

        Task UpdateTransaction(TransactionViewModel transaction); 

        Task DeleteTransaction(TransactionViewModel transaction);


        Task<decimal> GetTotalAmountByTypeId(int typeId);

    }
}
