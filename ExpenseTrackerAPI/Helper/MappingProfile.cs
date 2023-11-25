using AutoMapper;
using ExpenseTracker.Model;
using ExpenseTracker.ViewModel;

namespace ExpenseTrackerAPI.Helper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<TransactionTypeModel, TransactionTypeViewModel>().ReverseMap();
            CreateMap<CategoryModel, CategoryViewModel>().ReverseMap();
            CreateMap<TransactionModel, TransactionViewModel>().ReverseMap();
        }
    }
}
