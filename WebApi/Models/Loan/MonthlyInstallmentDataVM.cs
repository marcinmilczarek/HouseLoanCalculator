namespace WebApi.Models.Loan
{
    public class MonthlyInstallmentDataVM
    {
        public int Id { get; set; }
        public decimal AmountOfCapitalAndInterest { get; set; }
        public decimal AmountOfInterest { get; set; }
        public decimal AmountOfCapital { get; set; }
        public decimal AmountOfCapitalRepaid { get; set; }
        public decimal AmountofPrincipalOutstanding  { get; set; }
    }
}