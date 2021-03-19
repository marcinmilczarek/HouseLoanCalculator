import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoanCalculatorComponent } from './forms';

const routes: Routes = [
    {
        path: '',
        component: LoanCalculatorComponent,
    },
    {
      path: 'loan-calculator',
      component: LoanCalculatorComponent,
  },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LoanCalculatorRoutingModule {}
