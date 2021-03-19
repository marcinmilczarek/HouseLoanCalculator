namespace WebApi.Models.Loan
{
    public class LoanCalculationDataVM
    {
        public decimal TotalValueOfLoan { get; set; }
        public int NumberOfAnnualInstallments { get; set; }
        public decimal AnnualInterestInstallments { get; set; }
        public DictionaryRecordVM Currency { get; set; }
    }
}