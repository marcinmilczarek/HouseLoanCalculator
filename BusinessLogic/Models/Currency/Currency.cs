namespace BusinessLogic.Models.Currency
{
    public abstract class Currency
    {
        public string Symbol  { get; set; }
        
        public ExchangeRate ExchangeRate  { get; set; }
    }
}