
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LazyImgDirective } from './directives/lazy-img.directive';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
    ],
    declarations: [
        LazyImgDirective,
    ],
    exports: [
        LazyImgDirective,
        FormsModule,
    ],
    providers: [
    ]
})
export class SharedModule {
}