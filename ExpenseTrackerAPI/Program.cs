using ExpenseTracker.Model;
using ExpenseTracker.Repository.IRepository;
using ExpenseTracker.Repository.Repository;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

ConfigurationManager configuration = builder.Configuration;


builder.Host.UseSerilog((context, configuration) => configuration.ReadFrom.Configuration(context.Configuration));

//CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowOrigin",
        builder => builder.WithOrigins("http://localhost:4200")
                          .AllowAnyHeader()
                          .AllowAnyMethod());
});

// For Entity Framework
builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(configuration.GetConnectionString("DefaultServer")));

//AutoMapper
builder.Services.AddAutoMapper(typeof(Program));


//Dependency
builder.Services.AddScoped<IRepoTransactionType, RepoTransactionType>();
builder.Services.AddScoped<IRepoCategory, RepoCategory>();
builder.Services.AddScoped<IRepoTransaction, RepoTransaction>();


builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseSerilogRequestLogging();

app.UseHttpsRedirection();

app.UseCors("AllowOrigin");

app.UseAuthorization();

app.MapControllers();

app.Run();
