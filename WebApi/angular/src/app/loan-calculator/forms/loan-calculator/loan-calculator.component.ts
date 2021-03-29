import { Component, OnInit } from '@angular/core';
import { ILoanCalculationDataVM, LoanCalculationDataVM } from '@loancalc/shared/model';
import { LoanPaymentSummaryVM, DictionaryRecordVM } from '@loancalc/shared/model';
import { LoanCalculatorService } from 'app/loan-calculator/shared';
import { catchError, finalize } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Label, MultiDataSet, Color } from 'ng2-charts';
import { AmountOfPaymentVM, PaymentSummaryVM } from './../../model/';

@Component({
    selector: 'app-loan-calculator',
    templateUrl: './loan-calculator.component.html',
    styleUrls: ['./loan-calculator.component.less'],
})
export class LoanCalculatorComponent implements OnInit {
    loanDataCalculationData: ILoanCalculationDataVM;
    loanPaymentSummary: LoanPaymentSummaryVM;
    isLoading: boolean = false;
    isServerError: boolean = false;

    errorMessage: string;

    //TODO move to control
    isLoanPaymentsMonthlySummary: boolean = false;

    isEnabledMonthlyPaymentChart: boolean = false;
    isEnabledMonthlyPaymentSummary: boolean = false;
    monthlyPaymentsChartLabels: Label[] = [];
    monthlyPaymentsChartData: MultiDataSet = [];
    monthlyPaymentsChartColors: Color[] = [];
    monthlyPaymentSummaryVM: PaymentSummaryVM[] = [];

    isEnabledTotalPaymentChart: boolean = false;
    isEnabledTotalPaymentSummary: boolean = false;
    totalPaymentSummaryVM: PaymentSummaryVM[] = [];

    active = 1;

    constructor(private loanCalculatorService: LoanCalculatorService) { }

    ngOnInit(): void {
        this.initalizedLoanCalculationData();
        this.initalizeRepamentSummary();
        this.initializeMonthlyPaymentSummary();
        this.initializeTotalPaymentSummary();
    }

    private initializeMonthlyPaymentSummary() {

        let defaultValue = 0;
        let defaultAmountOfPaymentVM = new AmountOfPaymentVM(defaultValue.toFixed(2), "PLN");
        this.monthlyPaymentsChartLabels = ['Capital', 'Interest'];
        this.monthlyPaymentsChartData = [[50, 50]];

        this.monthlyPaymentSummaryVM = [
            new PaymentSummaryVM("Capital", defaultAmountOfPaymentVM, '#fd7e14'),
            new PaymentSummaryVM("Interest", defaultAmountOfPaymentVM, '#0dcaf0'),
            new PaymentSummaryVM("Total", defaultAmountOfPaymentVM, 'white')
        ];

        this.monthlyPaymentsChartColors = [
            {
                backgroundColor: [
                    '#fd7e14',
                    '#0dcaf0'
                ]
            }
        ];

        this.isEnabledMonthlyPaymentChart = true;
    }

    private initializeTotalPaymentSummary() {

        let defaultValue = 0;
        let defaultAmountOfPaymentVM = new AmountOfPaymentVM(defaultValue.toFixed(2), "PLN");
        this.totalPaymentSummaryVM = [
            new PaymentSummaryVM("Total loan amount", defaultAmountOfPaymentVM, 'green'),
            new PaymentSummaryVM("Total Interest", defaultAmountOfPaymentVM, 'red'),
            new PaymentSummaryVM("Total Payments", defaultAmountOfPaymentVM, 'white')
        ];

        this.isEnabledTotalPaymentChart = true;
    }

    //TODO refactor
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
        this.loanDataCalculationData.Currency = new DictionaryRecordVM('PLN', 1);
    }

    showMonthlyChart(){
        this.isEnabledMonthlyPaymentChart = true;
        this.isEnabledMonthlyPaymentSummary = false;
    }

    showMonthlyDetails(){
        this.isEnabledMonthlyPaymentChart = false;
        this.isEnabledMonthlyPaymentSummary = true;
    }

    showTotalChart(){
        this.isEnabledTotalPaymentChart = true;
        this.isEnabledTotalPaymentSummary = false;
    }

    showTotalDetails(){
        this.isEnabledTotalPaymentChart = false;
        this.isEnabledTotalPaymentSummary = true;
    }

    valueOfLoanChanged(value: number) {
        this.loanDataCalculationData.TotalValueOfLoan = value;
    }

    numberOfAnnualInstallmentsChanged(value: number) {
        this.loanDataCalculationData.NumberOfAnnualInstallments = value;
    }

    isneccesaryDataCompleted(): boolean {
        return this.loanDataCalculationData.TotalValueOfLoan && this.loanDataCalculationData.NumberOfAnnualInstallments ? true : false;
    }

    calculatePayments() {
        this.isServerError = false;
        this.isLoading = true;
        this.loanPaymentSummary.NumberOfMonthlyIntallments = this.loanDataCalculationData.NumberOfAnnualInstallments;

        this.loanCalculatorService
            .getLoanCalculation(this.loanDataCalculationData)
            .pipe(
                catchError((err) => {
                    this.errorMessage = 'Internal server error';
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

                this.monthlyPaymentSummaryVM = [
                    new PaymentSummaryVM("Capital", new AmountOfPaymentVM((data.MonthlyPayment - data.MonthlyInterest).toFixed(2), "PLN"), '#fd7e14'),
                    new PaymentSummaryVM("Interest", new AmountOfPaymentVM(data.MonthlyInterest.toFixed(2), "PLN"), '#0dcaf0'),
                    new PaymentSummaryVM("Total Monthly Payment", new AmountOfPaymentVM(data.MonthlyPayment.toFixed(2), "PLN"), 'white')
                ];

                this.monthlyPaymentsChartData = [[Math.ceil((data.MonthlyPayment - data.MonthlyInterest) * 100) / 100, Math.ceil(data.MonthlyInterest * 100) / 100]];

                this.totalPaymentSummaryVM = [
                    new PaymentSummaryVM("Total value of loan", new AmountOfPaymentVM(data.TotalValueOfLoan.toFixed(2), "PLN"), 'green'),
                    new PaymentSummaryVM("Total Interest", new AmountOfPaymentVM(data.TotalInterest.toFixed(2), "PLN"), 'red'),
                    new PaymentSummaryVM("Total Payments", new AmountOfPaymentVM(data.TotalPayment.toFixed(2), "PLN"), 'white')
                ];

                this.isLoanPaymentsMonthlySummary = true;
            });
    }
}
