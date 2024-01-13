using AutoMapper;
using AutoMapper.QueryableExtensions;
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
    public class RepoCategory : IRepoCategory
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public RepoCategory(ApplicationDbContext context, IMapper mapper) 
        {
            _context = context;
            _mapper = mapper;
        }


        public async Task<IEnumerable<CategoryViewModel>> GetCategories()
        {
            // var result = await _context.Category.AsNoTracking().ToListAsync();

            var result = await (from c in _context.Category
                                          join t in _context.TransactionTypes on c.TransactionTypeId equals t.Id
                                          select new CategoryViewModel
                                          {
                                              Id = c.Id,
                                              Name = c.Name,
                                              TransactionTypeId = c.TransactionTypeId,
                                              TransactionType = t.Name,
                                              Description = c.Description,
                                              Icon = c.Icon,
                                              CreationDate = c.CreationDate,
                                          }).ToListAsync();


            return _mapper.Map<IEnumerable<CategoryViewModel>>(result);
        }


        public async Task<CategoryViewModel> GetCategory(int id)
        {
            // var result = await _context.Category.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id);
            
            var result = await (from c in _context.Category
                                .Where(t => t.Id == id)
                                join t in _context.TransactionTypes on c.TransactionTypeId equals t.Id
                                select new CategoryViewModel
                                {
                                    Id = c.Id,
                                    Name = c.Name,
                                    TransactionTypeId = c.TransactionTypeId,
                                    TransactionType = t.Name,
                                    Description = c.Description,
                                    Icon = c.Icon,
                                    CreationDate = c.CreationDate,
                                }).AsNoTracking().FirstOrDefaultAsync();

            return _mapper.Map<CategoryViewModel>(result);
        }

        public async Task AddCategory(CategoryViewModel model)
        {
            var result = _mapper.Map<CategoryModel>(model);
            await _context.Category.AddAsync(result);
            await _context.SaveChangesAsync();
        }


        public async Task UpdateCategory(CategoryViewModel model)
        {
            var result = _mapper.Map<CategoryModel>(model);

            _context.Category.Update(result);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteCategory(CategoryViewModel model)
        {
            var result = _mapper.Map<CategoryModel>(model);

            if(result != null)
            {
                _context.Category.Remove(result);
               await _context.SaveChangesAsync();
            }
        }

    

    }
}
