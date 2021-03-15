namespace BusinessLogic.Models.Currency
{
    public abstract class ExchangeRate
    {
        public decimal ExchangeRateValue { get; set; }

        public int Unit { get; set; }

        public TypeExchangeCurrency TypeExchangeCurrency { get; set; }
    }
}