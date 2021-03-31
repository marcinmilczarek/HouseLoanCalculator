
export interface IMonthlyInstallmentDataVM {
    Id: number;
    AmountOfCapitalAndInterest: number;
    AmountOfInterest: number;
    AmountOfCapital: number;
    AmountOfCapitalPaid: number;
    AmountOfInterestPaid: number;
    AmountofPrincipalOutstanding: number;
}
export class MonthlyInstallmentDataVM implements IMonthlyInstallmentDataVM {
    Id: number;
    AmountOfCapitalAndInterest: number;
    AmountOfInterest: number;
    AmountOfCapital: number;
    AmountOfCapitalPaid: number;
    AmountOfInterestPaid: number;
    AmountofPrincipalOutstanding: number;
}
