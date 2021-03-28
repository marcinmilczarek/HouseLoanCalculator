export class AmountOfPaymentVM {
    Amount: string;
    CurrencyCode: string;

    constructor(amount: string, currencyCode: string) {
        this.Amount = amount,
        this.CurrencyCode = currencyCode;
    }
}
