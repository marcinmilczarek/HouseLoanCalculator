import { Component, Input } from '@angular/core';
import { MonthlyInstallmentDataVM } from '@loancalc/shared/model/MonthlyInstallmentDataVm';

@Component({
    selector: 'list-of-intallments',
    templateUrl: './list-of-intallments.component.html',
    styleUrls: ['./list-of-intallments.component.less'],
})
export class ListOfInstallmentsComponent{

    @Input() installmentDataVM: MonthlyInstallmentDataVM[] = [];

}
