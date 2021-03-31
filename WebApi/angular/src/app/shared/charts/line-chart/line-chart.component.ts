import { Component, Input } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
    selector: 'line-chart',
    templateUrl: './line-chart.component.html',
    styleUrls: ['./line-chart.component.less'],
})
export class LineChartComponent {

    @Input() lineChartLabels: Label[] = [];
    @Input() lineChartdata: ChartDataSets[] = [];

    lineChartOptions = {responsive: true, maintainAspectRatio: false};
    lineChartType: ChartType = 'line';
    lineChartPlugins:any = [];

    constructor() {}

    ngOnInit(): void {}
}
