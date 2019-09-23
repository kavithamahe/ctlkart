import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { CustomePipe } from './custome.pipe';
@NgModule({
    declarations: [CustomePipe],
    imports: [
        CommonModule
    ],
    exports: [
        CustomePipe
    ]
})
export class custumePipeModule {
    static forRoot() {
        return {
            ngModule: custumePipeModule,
            providers: [],
        };
     }
}
