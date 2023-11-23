using ExpenseTracker.Repository.IRepository;
using ExpenseTracker.ViewModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ExpenseTrackerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionTypeController : ControllerBase
    {
        private readonly IRepoTransactionType _repoTransactionType;

        public TransactionTypeController(IRepoTransactionType repoTransactionType)
        {
            _repoTransactionType = repoTransactionType;
        }


        [HttpGet]
        public async Task<IEnumerable<TransactionTypeViewModel>> GetAll()
        {
            try
            {
                return await _repoTransactionType.GetTransactionTypes();
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
