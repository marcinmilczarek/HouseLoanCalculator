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
    @Input() lineChartColors: Color[] = [];

    
    // lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    // data: ChartDataSets[]  = [
    //     { data: [100, 200, 300, 800, 1200, 800, 4660], label: 'capital'},
    //     { data: [2100, 1800, 300, 1100, 100, 80000, 40], label: 'interest'},
    // ];

    lineChartOptions = {responsive: true,};
    lineChartType: ChartType = 'line';
    lineChartPlugins:any = [];

    constructor() {}

    ngOnInit(): void {}
}
