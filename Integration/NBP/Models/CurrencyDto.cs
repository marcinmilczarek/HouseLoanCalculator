using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace NBP.Models
{
    public class CurrencyDto
    {
        [JsonPropertyName("table")]
        public string InternalBpmCode { get; set; }

        [JsonPropertyName("no")]
        public string NBPExchangeCode { get; set; }

        [JsonPropertyName("effectiveDate")]
        public string EffectiveDate { get; set; }

        [JsonPropertyName("rates")]
        public List<RateDto> Rates { get; set; }
    }
}