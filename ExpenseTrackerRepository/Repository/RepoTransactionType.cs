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
    public class RepoTransactionType : IRepoTransactionType
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        public RepoTransactionType(ApplicationDbContext context, IMapper mapper)
        {
            _context = context; 
            _mapper = mapper;
        }

        public async Task<IEnumerable<TransactionTypeViewModel>> GetTransactionTypes()
        {
            //var result = (from t in _context.TransactionTypes
            //              select new TransactionTypeViewModel
            //              {
            //                  Id = t.Id,
            //                  Name = t.Name,
            //              })
            //    .ToListAsync();

            //return await result;

           var result = await _context.TransactionTypes.ToListAsync();
            return _mapper.Map<IEnumerable<TransactionTypeViewModel>>(result);


        }
    }
}
