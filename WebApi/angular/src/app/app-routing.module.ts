import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizeGuard } from './../api-authorization/authorize.guard';

const routes: Routes = [
    { path: '', redirectTo: '/loan-calculator', pathMatch: 'full'},
    {
        path: 'loan-calculator',
        loadChildren: () => import('./loan-calculator/loan-calculator.module').then((m) => m.LoanCalculatorModule),
        data: { animation: 'loan-calculator' },
    },
    {
        path: 'about',
        loadChildren: () => import('./about/about.module').then((m) => m.AboutModule),
        data: { animation: 'about' },
    },
    {
        path: 'currency',
        loadChildren: () => import('./currency/currency.module').then((m) => m.CurrencyModule),
        data: { animation: 'currency' },
    },
    {
        path: 'saved-data',
        loadChildren: () => import('./saved-data/saved-data.module').then((m) => m.SavedDataModule),
        // canActivate: [AuthorizeGuard]
    },
    { path: '**', redirectTo: '/loan-calculator' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes
        // , { enableTracing: true }
        )
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
