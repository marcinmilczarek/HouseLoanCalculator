import { DictionaryRecordVM } from '@loancalc/shared/model';
import { MonthlyInstallmentDataVM } from './MonthlyInstallmentDataVm';

export interface ILoanPaymentSummaryVM {
    TotalPayment: number;
    TotalInterest: number;
    TotalLoanAmount: number;
    MonthlyPayment: number;
    MonthlyInterest: number;
    NumberOfMonthlyIntallments: number;
    LoanStartDate: Date;
    LoanPayOffDate: Date;
    Currency: DictionaryRecordVM;
    MonthlyInstallmentDataVM: MonthlyInstallmentDataVM[];
}
export class LoanPaymentSummaryVM implements ILoanPaymentSummaryVM {
    TotalPayment: number;
    TotalInterest: number;
    TotalLoanAmount: number;
    MonthlyPayment: number;
    MonthlyInterest: number;
    NumberOfMonthlyIntallments: number;
    LoanStartDate: Date;
    LoanPayOffDate: Date;
    Currency: DictionaryRecordVM;
    MonthlyInstallmentDataVM: MonthlyInstallmentDataVM[];
}
