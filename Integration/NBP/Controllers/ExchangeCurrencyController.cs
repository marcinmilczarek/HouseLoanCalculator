using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using BusinessLogic.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using NBP.Infrastructure;
using NBP.Models;
using NSwag.Annotations;

namespace NBP.Controllers
{
    [Route("exchangecurrency")]  
    [ApiController]  
    public class ExchangeCurrencyController :  ApiBaseController
    {
        private readonly IConfiguration _configuration;

        public ExchangeCurrencyController(HttpClient httpClient, IConfiguration configuration) : base(httpClient)
        {
            _configuration = configuration;
        }


        [HttpGet]
        [Route("averagerates")]
        [SwaggerResponseAttribute(typeof(IEnumerable<CurrencyDto>))]
        [ProducesResponseType(typeof(IEnumerable<CurrencyDto>), 200)]
        public async Task<CurrencyDto[]> GetCurrencyWithAverageRates()
        {
            var exchangeRatesUrl = _configuration.GetValue<string>("NBP_ExchangeRates_Url");
            return await Get<CurrencyDto[]>($"{exchangeRatesUrl}/{ExchangeRateType.BuyAndSellPrices.GetDescription()}");
        }
    }
}