import { Component, OnInit } from '@angular/core';

import { ILoanCalculationDataVM, LoanCalculationDataVM } from '@loancalc/shared/model';
import {  LoanPaymentSummaryVM, DictionaryRecordVM } from '@loancalc/shared/model';
import { LoanCalculatorService } from 'app/loan-calculator/shared';
import { catchError, finalize } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { DisplayedLoanPaymentSummary} from '../../model';

@Component({
  selector: 'app-loan-calculator',
  templateUrl: './loan-calculator.component.html',
  styleUrls: ['./loan-calculator.component.less']
})
export class LoanCalculatorComponent implements OnInit {
  loanDataCalculationData: ILoanCalculationDataVM;
  loanPaymentSummary: LoanPaymentSummaryVM;
  isLoading: boolean = false;
  isServerError: boolean = false;
  isLoanPaymentsMonthlySummary: boolean = false;
  errorMessage: string;
  displayedLoanPaymentSummary: DisplayedLoanPaymentSummary;

  constructor(
    private loanCalculatorService: LoanCalculatorService
  ) {
  }

  ngOnInit(): void {
    this.initalizedLoanCalculationData();
    this.initalizeRepamentSummary();
    this.initializeDisplayedLoanPaymentSummary();
  }

  private initializeDisplayedLoanPaymentSummary() {
    this.displayedLoanPaymentSummary = new DisplayedLoanPaymentSummary();
    this.displayedLoanPaymentSummary.MonthlyPayment = "";
    this.displayedLoanPaymentSummary.MonthlyInterest = "";
    this.displayedLoanPaymentSummary.TotalPayment = "";
    this.displayedLoanPaymentSummary.TotalInterest = "";
  }

  private initalizeRepamentSummary() {

    this.loanPaymentSummary = new LoanPaymentSummaryVM();
    this.loanPaymentSummary.TotalPayment = 0;
    this.loanPaymentSummary.TotalInterest = 0;
    this.loanPaymentSummary.MonthlyPayment = 0;
    this.loanPaymentSummary.MonthlyInterest = 0;
  }

  private initalizedLoanCalculationData() {
    this.loanDataCalculationData = new LoanCalculationDataVM();
    this.loanDataCalculationData.AnnualInterestInstallments = 3.5;
    this.loanDataCalculationData.Currency = new DictionaryRecordVM("PLN", 1);
  }

  valueOfLoanChanged(value: number) {
    this.loanDataCalculationData.TotalValueOfLoan = value;
  }

  numberOfAnnualInstallmentsChanged(value: number) {
    this.loanDataCalculationData.NumberOfAnnualInstallments = value;
  }

  isneccesaryDataCompleted(): boolean {
    return (this.loanDataCalculationData.TotalValueOfLoan && this.loanDataCalculationData.NumberOfAnnualInstallments) ? true : false;
  }

  calculatePayments() {
    this.isServerError = false;
    this.isLoading = true;
    this.loanPaymentSummary.NumberOfMonthlyIntallments = this.loanDataCalculationData.NumberOfAnnualInstallments;

    this.loanCalculatorService.getLoanCalculation(this.loanDataCalculationData)
      .pipe(
        catchError((err) => {
          this.errorMessage = "Internal server error"
          this.isServerError = true;
          return throwError(err);
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((data) => {
        if (!data) {
          return;
        }

        this.loanPaymentSummary = data;
        this.displayedLoanPaymentSummary = new DisplayedLoanPaymentSummary();
        this.displayedLoanPaymentSummary.MonthlyPayment = data.MonthlyPayment.toFixed(2);
        this.displayedLoanPaymentSummary.MonthlyInterest = data.MonthlyInterest.toFixed(2);
        this.displayedLoanPaymentSummary.TotalPayment = data.TotalPayment.toFixed(2);
        this.displayedLoanPaymentSummary.TotalInterest = data.TotalInterest.toFixed(2);

        this.isLoanPaymentsMonthlySummary = true;
      });
  }
}
