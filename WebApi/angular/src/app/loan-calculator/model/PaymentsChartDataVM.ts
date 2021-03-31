import { ChartDataSets } from "chart.js";
import { Color, Label, SingleDataSet } from "ng2-charts";

export class PaymentsChartDataVM {
    Labels: Label[] = [];
    Data: ChartDataSets[] | SingleDataSet[] = [];
    Colors: Color[] = [];

    constructor(labels: Label[], data:  ChartDataSets[] | SingleDataSet[], colors?: Color[]) {
        this.Labels = labels;
        this.Data = data;
        this.Colors = colors;
    }
}