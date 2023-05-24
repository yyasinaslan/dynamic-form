import {NgModule} from '@angular/core';
import {DynamicFormComponent} from "./dynamic-form.component";
import {CheckboxComponent} from "./controls/checkbox/checkbox.component";
import {TextboxComponent} from "./controls/textbox/textbox.component";
import {MultiCheckboxComponent} from "./controls/multi-checkbox/multi-checkbox.component";
import {FileInputComponent} from "./controls/file-input/file-input.component";
import {SelectComponent} from "./controls/select/select.component";
import {TextareaComponent} from "./controls/textarea/textarea.component";
import {HelperTextDirective} from "./directives/helper-text.directive";
import {ValidatorMessageDirective} from "./directives/validator-message.directive";
import {FormControlComponent} from "./components/form-control/form-control.component";
import {HelperTextComponent} from "./components/helper-text/helper-text.component";
import {ValidationFeedbackComponent} from "./components/validation-feedback/validation-feedback.component";

const COMPONENTS = [
  DynamicFormComponent,
  FormControlComponent,
  HelperTextComponent,
  ValidationFeedbackComponent,

  CheckboxComponent,
  TextboxComponent,
  MultiCheckboxComponent,
  FileInputComponent,
  SelectComponent,
  TextareaComponent,

  HelperTextDirective,
  ValidatorMessageDirective
]

@NgModule({
  imports: COMPONENTS,
  exports: COMPONENTS
})
export class DynamicFormModule {
}
