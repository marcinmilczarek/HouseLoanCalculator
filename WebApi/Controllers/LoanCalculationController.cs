using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using WebApi.Models;
using WebApi.Models.Loan;

namespace WebApi.Controllers
{
    //[Authorize]
    [Route("api/loancalculation")]
    public class LoanCalculationController : ControllerBase
    {
        private readonly ILogger<LoanCalculationController> _logger;

        public LoanCalculationController(ILogger<LoanCalculationController> logger)
        {
            _logger = logger;
        }

        //TODO move to BL and try make this logic generic regardless of the type of loan 
        //TODO choose between factory pattern or builder pattern
        //add automapper
        //TODO add unit tests + use fluen nhibernate
        [HttpGet]
        [Route("paymentsummary")]
        public LoanPaymentSummaryVM Get([FromQuery]decimal totalValueOfLoan, [FromQuery]int numberOfAnnualInstallments, 
            [FromQuery]decimal annualInterestInstallments)
        {
            var monthlyInstallments = new List<MonthlyInstallmentDataVM>();
            var parameterToCalculationFixedRates =
                decimal.ToDouble(1 + annualInterestInstallments / 100 / 12);
            var numberOfDeclaredMonthlyInstallments =
                Convert.ToDouble(numberOfAnnualInstallments * 12);
            var monthlyAmountOfCapitalAndInterest =
                Convert.ToDouble(totalValueOfLoan) * Math.Pow(parameterToCalculationFixedRates,
                                                                           numberOfDeclaredMonthlyInstallments)
                                                                       * (parameterToCalculationFixedRates - 1) /
                (Math.Pow(parameterToCalculationFixedRates, numberOfDeclaredMonthlyInstallments) - 1);

            var amountOfMonthlyInterest = monthlyAmountOfCapitalAndInterest -
                                          Convert.ToDouble(totalValueOfLoan) /
                                          numberOfDeclaredMonthlyInstallments;

            var amountOfMonthlyCapital = monthlyAmountOfCapitalAndInterest - amountOfMonthlyInterest;

            for (var i = 1; i <= numberOfDeclaredMonthlyInstallments; i++)
            {
                monthlyInstallments.Add(new MonthlyInstallmentDataVM
                {
                    Id = i,
                    AmountOfCapitalAndInterest = (decimal)  monthlyAmountOfCapitalAndInterest,
                    AmountOfCapital = (decimal)  amountOfMonthlyCapital,
                    AmountOfInterest = (decimal)  amountOfMonthlyInterest,
                    AmountOfCapitalPaid = (decimal)  amountOfMonthlyCapital * i,
                    AmountOfInterestPaid = (decimal)  amountOfMonthlyInterest * i,
                    AmountofPrincipalOutstanding = totalValueOfLoan -
                                                   (decimal) amountOfMonthlyCapital * i
                });
            }

            var calculationDate = DateTime.Now;

            return new LoanPaymentSummaryVM
            {
                LoanStartDate = calculationDate,
                LoanPayOffDate = calculationDate.AddYears(numberOfAnnualInstallments),
                NumberOfMonthlyIntallments = (int) numberOfDeclaredMonthlyInstallments,
                MonthlyInterest = (decimal) amountOfMonthlyInterest,
                MonthlyPayment = (decimal) monthlyAmountOfCapitalAndInterest,
                TotalValueOfLoan = totalValueOfLoan,
                TotalPayment = (decimal) (monthlyAmountOfCapitalAndInterest * numberOfDeclaredMonthlyInstallments),
                TotalInterest = (decimal) (monthlyAmountOfCapitalAndInterest * numberOfDeclaredMonthlyInstallments -
                                           Convert.ToDouble(totalValueOfLoan)),
                MonthlyInstallmentData = monthlyInstallments.ToArray()
            };
        }
    }
}