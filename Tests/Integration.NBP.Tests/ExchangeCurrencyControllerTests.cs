using System.Collections.Generic;
using System.Linq;
using NUnit.Framework;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Moq;
using NBP.Controllers;

namespace Integration.NBP.Tests
{
    public class ExchangeCurrencyControllerTests
    {

        [Test]
        public async Task Get_Average_Exchange_Currency_Return_Value()
        {
            var mockHttpClient = new Mock<HttpClient>();
            
            var inMemorySettings = new Dictionary<string, string> {
                {"NBP_ExchangeRates_Url", "http://api.nbp.pl/api/exchangerates/tables"},
            };
            IConfiguration configuration = new ConfigurationBuilder()
                .AddInMemoryCollection(inMemorySettings)
                .Build();
            
            var exchangeCurrencyController = new ExchangeCurrencyController(mockHttpClient.Object, configuration);
         
            var currencyDtos = await exchangeCurrencyController.GetCurrencyWithAverageRates();

            Assert.NotNull(currencyDtos);
            Assert.IsTrue(currencyDtos.Length == 1);
            Assert.IsTrue(currencyDtos[0].Rates.Any(rates => rates.CurrencyCode == "USD"));
            Assert.IsTrue(currencyDtos[0].Rates.Any(rates => rates.CurrencyCode == "NOK"));
        }
    }
}