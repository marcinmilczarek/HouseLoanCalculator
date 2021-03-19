import { Component } from '@angular/core';

@Component({
  selector: 'app-currency-component',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.less']
})
export class CurrencyComponent {
  public currentCount = 0;

  public incrementCounter() {
    this.currentCount++;
  }
}
