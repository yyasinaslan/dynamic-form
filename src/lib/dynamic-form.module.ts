import {NgModule} from '@angular/core';
import {DynamicFormComponent} from "dynamic-form/dynamic-form.component";

const COMPONENTS = [
  DynamicFormComponent
]

@NgModule({
  imports: COMPONENTS,
  exports: COMPONENTS
})
export class DynamicFormModule {
}
