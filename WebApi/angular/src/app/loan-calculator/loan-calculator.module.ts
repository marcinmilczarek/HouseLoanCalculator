import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { LoanCalculatorComponent } from './forms';
import { FormsModule } from '@angular/forms';
import { LoanCalculatorRoutingModule } from './loan-calculator-routing.module';
import { CommonModule } from '@angular/common';
import * as services from './shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [CommonModule, FormsModule, LoanCalculatorRoutingModule, SharedModule, NgbModule],
    declarations: [LoanCalculatorComponent],
    exports: [],
    providers: [services.LoanCalculatorService, Location, { provide: LocationStrategy, useClass: PathLocationStrategy }],
})
export class LoanCalculatorModule {}
