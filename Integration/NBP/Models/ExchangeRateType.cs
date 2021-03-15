using System.ComponentModel;

namespace NBP.Models
{
    public enum ExchangeRateType
    {
        [Description("A")]
        MiddleExchangeFirstPartOfCountries,
        
        [Description("B")]
        MiddleExchangeLastPartOfCountries,
        
        [Description("C")]
        BuyAndSellPrices,
    }
}