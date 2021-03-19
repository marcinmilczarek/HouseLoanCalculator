import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '@loancalc/services';
import { LoanCalculationDataVM, LoanPaymentSummaryVM } from'@loancalc/shared/model'

@Injectable({ providedIn: 'root' })
export class LoanCalculatorService extends BaseService {
    constructor(private http: HttpClient) {
        super(http);
    }

    public getLoanCalculation(loanCalculationData: LoanCalculationDataVM): Observable<LoanPaymentSummaryVM> {
        return this.get('loancalculation/paymentsummary', { 
            totalValueOfLoan: loanCalculationData.TotalValueOfLoan,
            numberOfAnnualInstallments: loanCalculationData.NumberOfAnnualInstallments,
            annualInterestInstallments: loanCalculationData.AnnualInterestInstallments
        });
    }
}
