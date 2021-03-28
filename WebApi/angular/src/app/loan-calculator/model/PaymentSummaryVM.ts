
import { AmountOfPaymentVM } from './AmountOfPaymentVM'

export class PaymentSummaryVM {
    InstallmentComponent: string;
    AmountOfPaymentVM: AmountOfPaymentVM;
    ColorLegend: string;

    constructor(installmentComponent: string, amountOfPaymentVM: AmountOfPaymentVM, colorLegend: string) {
        this.InstallmentComponent = installmentComponent,
        this.AmountOfPaymentVM = amountOfPaymentVM;
        this.ColorLegend = colorLegend;
    }
}
