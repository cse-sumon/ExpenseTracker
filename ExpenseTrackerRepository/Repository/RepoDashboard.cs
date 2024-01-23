using AutoMapper;
using ExpenseTracker.Model;
using ExpenseTracker.Repository.IRepository;
using ExpenseTracker.ViewModel;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExpenseTracker.Repository.Repository
{
    public class RepoDashboard : IRepoDashboard
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        public RepoDashboard(ApplicationDbContext context, IMapper mapper)
        {
            _context = context; 
            _mapper = mapper;
        }

        public async Task<decimal> GetAllIncomeExpense(int id)
        {
            var result = await _context.Transactions
                .Where(x => x.TransactionTypeId == id)
                .SumAsync(s => s.Amount);
            return result;
        }
    }
}
