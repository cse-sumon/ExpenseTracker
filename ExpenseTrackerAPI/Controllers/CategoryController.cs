﻿using ExpenseTracker.Repository.IRepository;
using ExpenseTracker.ViewModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ExpenseTrackerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly IRepoCategory _repoCategory;
        private readonly IWebHostEnvironment _environment;
        private readonly ILogger<CategoryController> _logger;

        public CategoryController(IRepoCategory repoCategory, IWebHostEnvironment environment, ILogger<CategoryController> logger)
        {
            _repoCategory = repoCategory;
            _environment = environment;
            _logger = logger;

        }


        [HttpGet]
        public async Task<IActionResult> GetAllCategories()
        {
            try
            {
                _logger.LogInformation("Get Category calling 2222....");
                return Ok(await _repoCategory.GetCategories());
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetCategory(int id)
        {
            try
            {
                var result =  await _repoCategory.GetCategory(id);
                if(result == null)
                {
                    return NotFound();
                }
                return Ok(result);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpGet("GetCategoryByTransactionTypeId/{id:int}")]
        public async Task<IActionResult> GetCategoryByTransactionTypeId(int id)
        {
            try
            {
                var result = await _repoCategory.GetCategoryByTransactionTypeId(id);
                if (result == null)
                {
                    return NotFound();
                }
                return Ok(result);
            }
            catch (Exception)
            {
                throw;
            }
        }


        [HttpPost]
        public async Task<ActionResult> CreateCategory([FromBody]CategoryViewModel model)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest();


                if (model.File != null)
                {
                    //var uploadsFolder = Path.Combine(_environment.WebRootPath, "uploads");
                    var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "uploads");

                    if (!Directory.Exists(uploadsFolder))
                        Directory.CreateDirectory(uploadsFolder);

                    var type = model.TransactionTypeId == 1 ? "Income" : "Expense";

                    var ex = Path.GetExtension(model.File.FileName);

                    var fileName = $"{type}_{model.Name}{ex}";

                    fileName = fileName.Replace(" ", "_");

                    var filePath = Path.Combine(uploadsFolder, fileName);

                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await model.File.CopyToAsync(stream);
                    }

                    //set path to the model to store into the db
                    model.Icon = filePath;
                }


                model.CreationDate = DateOnly.FromDateTime(DateTime.Now);
                await _repoCategory.AddCategory(model);

                return Ok();
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException(ex.Message);
            }
        }


        [HttpPut("{id:int}")]
        public async Task<ActionResult> UpdateCategory(int id, [FromBody] CategoryViewModel model)
        {
            try
            {
                if (id != model.Id)
                    return BadRequest("Category ID mismatch");

                if (!ModelState.IsValid)
                {
                    return BadRequest();
                }

                var exist = await _repoCategory.GetCategory(id);
                if (exist == null)
                {
                    return NotFound();
                }


                if (model.File != null)
                {
                    //var uploadsFolder = Path.Combine(_environment.WebRootPath, "uploads");
                    var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "uploads");

                    if (!Directory.Exists(uploadsFolder))
                        Directory.CreateDirectory(uploadsFolder);

                    var type = model.TransactionTypeId == 1 ? "Income" : "Expense";

                    var ex = Path.GetExtension(model.File.FileName);

                    var fileName = $"{type}_{model.Name}{ex}";

                    fileName = fileName.Replace(" ", "_");

                    var filePath = Path.Combine(uploadsFolder, fileName);

                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await model.File.CopyToAsync(stream);
                    }

                    // Delete the file
                    if (System.IO.File.Exists(model.Icon))
                    {
                        System.IO.File.Delete(model.Icon);
                    }

                    //set path to the model to store into the db
                    model.Icon = filePath;
                }

                
                await _repoCategory.UpdateCategory(model);

                return Ok();
            }
            catch (Exception)
            {
                throw;
            }
        }


        [HttpDelete("{id:int}")]
        public async Task<ActionResult> DeleteCategory(int id)
        {
            try
            {
                CategoryViewModel model = await _repoCategory.GetCategory(id);
                if (model == null)
                {
                    return NotFound();
                }

                await _repoCategory.DeleteCategory(model);

                // Delete the file
                if (System.IO.File.Exists(model.Icon))
                {
                    System.IO.File.Delete(model.Icon);
                }

                return NoContent();
            }
            catch (Exception)
            {
                throw;
            }
        }

    }
}
