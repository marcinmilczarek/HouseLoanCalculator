import { NgModule } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { LoanCalculatorComponent } from  './forms'
import { FormsModule } from '@angular/forms';
import { LoanCalculatorRoutingModule } from './loan-calculator-routing.module';
import { ChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';  
import * as services from './shared';

@NgModule({
    imports: [
        LoanCalculatorRoutingModule,
        ChartsModule,
        FormsModule,
        CommonModule
    ],
    declarations: [LoanCalculatorComponent],
    exports: [],
    providers: [
        services.LoanCalculatorService,
        Location, { provide: LocationStrategy, useClass: PathLocationStrategy }
    ],
})
export class LoanCalculatorModule {}
