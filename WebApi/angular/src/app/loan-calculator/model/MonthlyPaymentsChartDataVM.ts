import { Color, Label, MultiDataSet } from "ng2-charts";
import { PaymentSummaryVM } from ".";

export class MonthlyPaymentsChartDataVM {
    Labels: Label[] = [];
    Data: MultiDataSet = [];
    Colors: Color[] = [];

    constructor(labels: Label[], data: MultiDataSet, colors: Color[]) {
        this.Labels = labels;
        this.Data = data;
        this.Colors = colors;
    }
}
