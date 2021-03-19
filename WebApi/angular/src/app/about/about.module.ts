import { NgModule } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

import { AboutComponent } from './forms';

import { AboutRoutingModule } from './about-routing.module';

@NgModule({
    imports: [AboutRoutingModule],
    declarations: [AboutComponent],
    exports: [],
    providers: [Location, { provide: LocationStrategy, useClass: PathLocationStrategy }],
})
export class AboutModule {}
