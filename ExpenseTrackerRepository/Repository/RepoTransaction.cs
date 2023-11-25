using AutoMapper;
using ExpenseTracker.Model;
using ExpenseTracker.Repository.IRepository;
using ExpenseTracker.ViewModel;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExpenseTracker.Repository.Repository
{
    public class RepoTransaction : IRepoTransaction
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public RepoTransaction(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }


        public async Task<IEnumerable<TransactionViewModel>> GetAllTransactions()
        {
            var result = await (from t in _context.Transactions
                                join tp in _context.TransactionTypes on t.TransactionTypeId equals tp.Id
                                join c in _context.Category on t.CategoryId equals c.Id
                                select new TransactionViewModel
                                {
                                    Id = t.Id,
                                    Title = t.Title,
                                    Desciption = t.Desciption,
                                    Amount = t.Amount,
                                    CreationDate = t.CreationDate,
                                    TransactionTypeId = t.TransactionTypeId,
                                    TransactionType = tp.Name,
                                    CategoryId = t.CategoryId,
                                    Category = c.Name

                                }).AsNoTracking().ToListAsync();

            return _mapper.Map<IEnumerable<TransactionViewModel>>(result);
        }

        public async Task<TransactionViewModel> GetTransaction(int id)
        {
            var result = await (from t in _context.Transactions
                               .Where(t=>t.Id == id)
                               join tp in _context.TransactionTypes on t.TransactionTypeId equals tp.Id
                               join c in _context.Category on t.CategoryId equals c.Id
                               select new TransactionViewModel
                               {
                                   Id = t.Id,
                                   Title = t.Title,
                                   Desciption = t.Desciption,
                                   Amount = t.Amount,
                                   CreationDate = t.CreationDate,
                                   TransactionTypeId = t.TransactionTypeId,
                                   TransactionType = tp.Name,
                                   CategoryId = t.CategoryId,
                                   Category = c.Name

                               }).AsNoTracking().FirstOrDefaultAsync();

            return  _mapper.Map<TransactionViewModel>(result);
        }


        public async Task<IEnumerable<TransactionViewModel>> GetTransactionByTypeId(int id)
        {
            var result = await (from t in _context.Transactions
                               .Where(t => t.TransactionTypeId == id)
                                join tp in _context.TransactionTypes on t.TransactionTypeId equals tp.Id
                                join c in _context.Category on t.CategoryId equals c.Id
                                select new TransactionViewModel
                                {
                                    Id = t.Id,
                                    Title = t.Title,
                                    Desciption = t.Desciption,
                                    Amount = t.Amount,
                                    CreationDate = t.CreationDate,
                                    TransactionTypeId = t.TransactionTypeId,
                                    TransactionType = tp.Name,
                                    CategoryId = t.CategoryId,
                                    Category = c.Name

                                }).AsNoTracking().ToListAsync();

            return _mapper.Map<IEnumerable<TransactionViewModel>>(result);

        }
        public async Task AddTransaction(TransactionViewModel transaction)
        {
            var result = _mapper.Map<TransactionModel>(transaction);
            _context.Transactions.Add(result);
            await _context.SaveChangesAsync();
        }


        public async Task UpdateTransaction(TransactionViewModel transaction)
        {
            var result = _mapper.Map<TransactionModel>(transaction);
            _context.Transactions.Update(result);
            await _context.SaveChangesAsync();
        }



        public async Task DeleteTransaction(TransactionViewModel transaction)
        {
            var result = _mapper.Map<TransactionModel>(transaction);

            if(result !=null)
            {
                _context.Transactions.Remove(result);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<decimal> GetTotalAmountByTypeId(int typeId)
        {
            decimal totalAmount = 0;
            totalAmount = await _context.Transactions
                           .Where(t => t.TransactionTypeId == typeId)
                           .Select(t => t.Amount)
                           .SumAsync();

            return totalAmount;
        }
    }
}
