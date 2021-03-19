import { NgModule } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

import { CurrencyComponent } from './forms';

import { CurrencyRoutingModule } from './currency-routing.module';

@NgModule({
    imports: [CurrencyRoutingModule],
    declarations: [CurrencyComponent],
    exports: [],
    providers: [Location, { provide: LocationStrategy, useClass: PathLocationStrategy }],
})
export class CurrencyModule {}
