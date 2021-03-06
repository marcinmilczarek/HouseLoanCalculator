import { Component, Input } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Color, Label, MultiDataSet} from 'ng2-charts';


@Component({
  selector: 'doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.less']
})
export class DoughnutChartComponent {

  @Input() doughnutChartLabels: Label[] = [];
  @Input() doughnutChartData: MultiDataSet[] = [];
  @Input() doughnutChartColors: Color[] = [];
  doughnutChartType : ChartType = 'doughnut';
  doughnutOptions: ChartOptions = { responsive: true, maintainAspectRatio: false};

  constructor() { }

  ngOnInit(): void {
  }
}
