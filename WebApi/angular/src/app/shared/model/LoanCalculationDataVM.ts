import { DictionaryRecordVM } from '@loancalc/shared/model';

export interface ILoanCalculationDataVM {
    TotalValueOfLoan: number;   
    NumberOfAnnualInstallments: number; 
    AnnualInterestInstallments: number;
    Currency: DictionaryRecordVM; 
}
export class LoanCalculationDataVM implements ILoanCalculationDataVM {
    TotalValueOfLoan: number;   
    NumberOfAnnualInstallments: number; 
    AnnualInterestInstallments: number;
    Currency: DictionaryRecordVM; 
}
