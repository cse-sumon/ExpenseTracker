using ExpenseTracker.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExpenseTracker.Repository.IRepository
{
    public interface IRepoCategory
    {
        Task<IEnumerable<CategoryViewModel>> GetCategories();

        Task<CategoryViewModel> GetCategory(int id);

        Task AddCategory(CategoryViewModel model);

        Task UpdateCategory(CategoryViewModel model);

        Task DeleteCategory(CategoryViewModel model);
    }
}
