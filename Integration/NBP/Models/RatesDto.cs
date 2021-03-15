using System.Text.Json.Serialization;

namespace NBP.Models
{
    public class RateDto
    {
        [JsonPropertyName("currency")]
        public string Currency { get; set; }

        [JsonPropertyName("code")]
        public string CurrencyCode { get; set; }

        [JsonPropertyName("mid")]
        public double MiddleExchangeFirstPartOfCountries { get; set; }
        
        [JsonPropertyName("bid")]
        public double BuyExchangeRate { get; set; }
        
        [JsonPropertyName("ask")]
        public double SellExchangeRate { get; set; }
    }
}