import { Component, Input } from '@angular/core';
import { PaymentSummaryVM } from '../../model';

@Component({
    selector: 'calculation-summary',
    templateUrl: './calculation-summary.component.html',
    styleUrls: ['./calculation-summary.component.less'],
})
export class CalculationSummaryComponent{

    @Input() paymentSummaryVM: PaymentSummaryVM[] = [];

}
