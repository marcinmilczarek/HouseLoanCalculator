using System;

namespace WebApi.Models.Loan
{
    public class LoanPaymentSummaryVM
    {
        public decimal TotalPayment { get; set; }
        public decimal TotalInterest { get; set; }
        public decimal TotalValueOfLoan { get; set; }
        public decimal MonthlyPayment { get; set; }
        public decimal MonthlyInterest { get; set; }
        public int NumberOfMonthlyIntallments { get; set; }
        public DateTime LoanStartDate { get; set; }
        public DateTime LoanPayOffDate { get; set; }
        public DictionaryRecordVM Currency { get; set; }
        public MonthlyInstallmentDataVM[] MonthlyInstallmentData { get; set; }
    }
}