import { NgModule } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

import { SavedDataComponent } from './forms';

import { SavedDataRoutingModule } from './saved-data-routing.module';

@NgModule({
    imports: [SavedDataRoutingModule],
    declarations: [SavedDataComponent],
    exports: [],
    providers: [Location, { provide: LocationStrategy, useClass: PathLocationStrategy }],
})
export class SavedDataModule {}
