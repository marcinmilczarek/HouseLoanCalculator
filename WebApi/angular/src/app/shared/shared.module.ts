
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LazyImgDirective } from './directives/lazy-img.directive';
import { ChartsModule } from 'ng2-charts';
import { DoughnutChartComponent } from './charts/doughnut-chart/doughnut-chart.component';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        ChartsModule
    ],
    declarations: [
        LazyImgDirective,
        DoughnutChartComponent
    ],
    exports: [
        LazyImgDirective,
        FormsModule,
        DoughnutChartComponent
    ],
    providers: [
    ]
})
export class SharedModule {
}