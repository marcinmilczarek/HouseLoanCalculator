import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SavedDataComponent } from './forms';

const routes: Routes = [
    {
        path: '',
        component: SavedDataComponent,
    },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SavedDataRoutingModule {}
