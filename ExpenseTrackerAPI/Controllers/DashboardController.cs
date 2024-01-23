using ExpenseTracker.Repository.IRepository;
using ExpenseTracker.ViewModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ExpenseTrackerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {

        private readonly IRepoDashboard _repoDashboard;

        public DashboardController(IRepoDashboard repoDashboard)
        {
            _repoDashboard = repoDashboard;
        }


        [HttpGet]
        public async Task<ActionResult> GetAllIncomeExpense()
        {
             decimal income = await _repoDashboard.GetAllIncomeExpense(1);
             decimal expense = await _repoDashboard.GetAllIncomeExpense(2);

            var dto = new DashboardDto()
            {
                TotalIncome = Convert.ToDecimal(income),
                TotalExpense = Convert.ToDecimal(expense),
            };

            return Ok(dto);
        }



    }
}
