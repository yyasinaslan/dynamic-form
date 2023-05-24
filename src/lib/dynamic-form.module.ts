import {NgModule} from '@angular/core';
import {DynamicFormComponent} from "./dynamic-form.component";
import {CheckboxComponent} from "./controls/checkbox/checkbox.component";
import {TextboxComponent} from "./controls/textbox/textbox.component";
import {MultiCheckboxComponent} from "./controls/multi-checkbox/multi-checkbox.component";
import {FileInputComponent} from "./controls/file-input/file-input.component";
import {SelectComponent} from "./controls/select/select.component";
import {TextareaComponent} from "./controls/textarea/textarea.component";
import {FormControlComponent} from "./components/form-control/form-control.component";
import {HelperTextComponent} from "./components/helper-text/helper-text.component";
import {InvalidMessageComponent} from "./components/invalid-message/invalid-message.component";

const COMPONENTS = [
  DynamicFormComponent,
  FormControlComponent,
  HelperTextComponent,
  InvalidMessageComponent,

  CheckboxComponent,
  TextboxComponent,
  MultiCheckboxComponent,
  FileInputComponent,
  SelectComponent,
  TextareaComponent
]

@NgModule({
  imports: COMPONENTS,
  exports: COMPONENTS
})
export class DynamicFormModule {
}
