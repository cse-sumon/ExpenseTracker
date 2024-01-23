using ExpenseTracker.Model;
using ExpenseTracker.Repository.IRepository;
using ExpenseTracker.ViewModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ExpenseTrackerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        private readonly IRepoTransaction _repoTransaction;

        public TransactionController(IRepoTransaction repoTransaction)
        {
            _repoTransaction = repoTransaction;
        }


        [HttpGet]
        public async Task<IActionResult> GetAllTransaction()
        {
            try
            {
                return Ok(await _repoTransaction.GetAllTransactions());
            }
            catch (Exception)
            {
                throw;
            }
        }


        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetTransaction(int id)
        {
            try
            {
                var transaction = await _repoTransaction.GetTransaction(id);
                if(transaction == null)
                {
                    return NotFound();
                }

                return Ok(transaction);
            }
            catch (Exception)
            {
                throw;
            }
        }


        [HttpGet("GetTransactionByTypeId/{id:int}")]
        public async Task<IActionResult> GetTransactionByTypeId(int id)
        {
            try
            {
                var transaction = await _repoTransaction.GetTransactionByTypeId(id);
                if (transaction == null)
                {
                    return NotFound();
                }

                return Ok(transaction);
            }
            catch (Exception)
            {
                throw;
            }
        }



        [HttpPost]
        public async Task<IActionResult> AddTransaction([FromBody]TransactionViewModel model)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                model.CreationDate = DateOnly.FromDateTime(DateTime.Now);
                await _repoTransaction.AddTransaction(model);

                return Ok();
            }
            catch (Exception)
            {
                throw;
            }
        }



        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateTransaction(int id, [FromBody]TransactionViewModel model)
        {
            try
            {
                if(model.Id != id)
                    return BadRequest("Transaction ID mismatch!");
                
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var exist = await _repoTransaction.GetTransaction(id);
                if(exist == null)
                    return NotFound();

                await _repoTransaction.UpdateTransaction(model);

                return Ok();
            }
            catch (Exception)
            {
                throw;
            }
        }


        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteTransaction(int id)
        {
            TransactionViewModel model = await _repoTransaction.GetTransaction(id);
            if(model == null)
                return NotFound();

            await _repoTransaction.DeleteTransaction(model);

            return Ok();
        }


        [HttpGet("GetTotalAmount/{typeId:int}")]
        public async Task<IActionResult> GetTotalAmount(int typeId)
        {
            
            var total = await _repoTransaction.GetTotalAmountByTypeId(typeId);

            return Ok(total);
        }


    }
}
