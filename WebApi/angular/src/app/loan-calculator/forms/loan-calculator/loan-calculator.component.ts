import { Component, OnInit } from '@angular/core';
import { ILoanCalculationDataVM, LoanCalculationDataVM } from '@loancalc/shared/model';
import { LoanPaymentSummaryVM, DictionaryRecordVM } from '@loancalc/shared/model';
import { LoanCalculatorService } from 'app/loan-calculator/shared';
import { catchError, finalize } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Label, MultiDataSet, Color } from 'ng2-charts';
import { AmountOfPaymentVM, MonthlyPaymentsChartDataVM, PaymentSummaryVM } from './../../model/';
import { ChartDataSets } from 'chart.js';

@Component({
    selector: 'app-loan-calculator',
    templateUrl: './loan-calculator.component.html',
    styleUrls: ['./loan-calculator.component.less'],
})
export class LoanCalculatorComponent implements OnInit {
    isLoanCalculatorDataLoading: boolean = false;
    isListOfAllInstallmentsGenerated: boolean = false;
    isServerError: boolean = false;
    errorMessage: string;

    dataToCalculation: ILoanCalculationDataVM;
    loanPaymentSummary: LoanPaymentSummaryVM;

    isEnabledMonthlyPaymentSummary: boolean = false;
    isEnabledMonthlyPaymentChart: boolean = false;

    monthlyPaymentsChartDataVM: MonthlyPaymentsChartDataVM;
    monthlyPaymentSummaryVM: PaymentSummaryVM[] = [];

    isEnabledTotalPaymentChart: boolean = false;
    isEnabledTotalPaymentSummary: boolean = false;
    totalPaymentSummaryVM: PaymentSummaryVM[] = [];
    totalPaymentChartData: ChartDataSets[] = [
        { data: [100, 200, 300, 800, 1200, 800, 4660], label: 'remaining capital to paid' },
        { data: [2100, 1800, 300, 1100, 100, 80000, 40], label: 'interest paid' },
    ];

    constructor(private loanCalculatorService: LoanCalculatorService) { }

    ngOnInit(): void {
        this.initalizedLoanCalculationData();
        this.initalizeRepamentSummary();
        this.initializeMonthlyPaymentChartData();
        this.initializeMonthlyPaymentSummaryData();
        this.initializeTotalPaymentSummary();
    }

    private initalizedLoanCalculationData() {
        this.dataToCalculation = new LoanCalculationDataVM();
        this.dataToCalculation.AnnualInterestInstallments = 3.5;
        this.dataToCalculation.Currency = new DictionaryRecordVM('PLN', 1);
    }

    private initializeMonthlyPaymentSummaryData() {
        let defaultValue = 0;
        let defaultAmountOfPaymentVM = new AmountOfPaymentVM(defaultValue.toFixed(2), "PLN");
        this.monthlyPaymentSummaryVM = [
            new PaymentSummaryVM("Capital", defaultAmountOfPaymentVM, '#fd7e14'),
            new PaymentSummaryVM("Interest", defaultAmountOfPaymentVM, '#0dcaf0'),
            new PaymentSummaryVM("Total", defaultAmountOfPaymentVM, 'white')
        ];

    }

    private initializeMonthlyPaymentChartData() {

        const monthlyPaymentsChartLabels = ['Capital', 'Interest'];
        const monthlyPaymentsChartData = [[50, 50]];
        const monthlyPaymentsChartColors = [
            {
                backgroundColor: [
                    '#fd7e14',
                    '#0dcaf0'
                ]
            }
        ];
        this.monthlyPaymentsChartDataVM = new MonthlyPaymentsChartDataVM(monthlyPaymentsChartLabels, monthlyPaymentsChartData, monthlyPaymentsChartColors);
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

    private initalizeRepamentSummary() {
        this.loanPaymentSummary = new LoanPaymentSummaryVM();
        this.loanPaymentSummary.TotalPayment = 0;
        this.loanPaymentSummary.TotalInterest = 0;
        this.loanPaymentSummary.MonthlyPayment = 0;
        this.loanPaymentSummary.MonthlyInterest = 0;
    }

    showMonthlyChart() {
        this.isEnabledMonthlyPaymentChart = true;
        this.isEnabledMonthlyPaymentSummary = false;
    }

    showMonthlyDetails() {
        this.isEnabledMonthlyPaymentChart = false;
        this.isEnabledMonthlyPaymentSummary = true;
    }

    showTotalChart() {
        this.isEnabledTotalPaymentChart = true;
        this.isEnabledTotalPaymentSummary = false;
    }

    showTotalDetails() {
        this.isEnabledTotalPaymentChart = false;
        this.isEnabledTotalPaymentSummary = true;
    }

    valueOfLoanChanged(value: number) {
        this.dataToCalculation.TotalValueOfLoan = value;
    }

    numberOfAnnualInstallmentsChanged(value: number) {
        this.dataToCalculation.NumberOfAnnualInstallments = value;
    }

    isneccesaryDataCompleted(): boolean {
        return this.dataToCalculation.TotalValueOfLoan && this.dataToCalculation.NumberOfAnnualInstallments ? true : false;
    }

    calculatePayments() {
        this.isServerError = false;
        this.isLoanCalculatorDataLoading = true;
        this.loanPaymentSummary.NumberOfMonthlyIntallments = this.dataToCalculation.NumberOfAnnualInstallments;

        this.loanCalculatorService
            .getLoanCalculation(this.dataToCalculation)
            .pipe(
                catchError((err) => {
                    this.errorMessage = 'Internal server error';
                    this.isServerError = true;
                    return throwError(err);
                }),
                finalize(() => {
                    this.isLoanCalculatorDataLoading = false;
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

                this.monthlyPaymentsChartDataVM.Data = [[Math.ceil((data.MonthlyPayment - data.MonthlyInterest) * 100) / 100, Math.ceil(data.MonthlyInterest * 100) / 100]];

                this.totalPaymentSummaryVM = [
                    new PaymentSummaryVM("Total value of loan", new AmountOfPaymentVM(data.TotalValueOfLoan.toFixed(2), "PLN"), 'green'),
                    new PaymentSummaryVM("Total Interest", new AmountOfPaymentVM(data.TotalInterest.toFixed(2), "PLN"), 'red'),
                    new PaymentSummaryVM("Total Payments", new AmountOfPaymentVM(data.TotalPayment.toFixed(2), "PLN"), 'white')
                ];


                this.isEnabledTotalPaymentChart

                this.isListOfAllInstallmentsGenerated = true;
            });
    }
}
