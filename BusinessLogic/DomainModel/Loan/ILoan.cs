using System;

namespace BusinessLogic.DomainModel.Loan
{
    public interface ILoan
    {
        decimal GetInterestRate();

        decimal GetLoanAmount();
        
        decimal GetNumberOfLoanInstallments();

        decimal GetValueOfLoanObject();
        
        //DateTime 

        
    }
}