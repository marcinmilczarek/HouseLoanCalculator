
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LazyImgDirective } from './directives/lazy-img.directive';
import { ChartsModule } from 'ng2-charts';
import { DoughnutChartComponent, LineChartComponent} from './charts';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        ChartsModule
    ],
    declarations: [
        LazyImgDirective,
        DoughnutChartComponent,
        LineChartComponent
    ],
    exports: [
        LazyImgDirective,
        FormsModule,
        DoughnutChartComponent,
        LineChartComponent
    ],
    providers: [
    ]
})
export class SharedModule {
}