namespace BusinessLogic.Models
{
    public class Amount
    {
        public decimal Value { get; set; }
        
        public decimal ValueInCurrency { get; set; }
        
        public Currency.Currency Currency  { get; set; }
    }
}