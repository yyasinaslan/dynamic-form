import {NgModule} from '@angular/core';
import {DynamicFormComponent} from './dynamic-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {MultiCheckboxComponent} from "./controls/multi-checkbox/multi-checkbox.component";
import {SelectComponent} from "./controls/select/select.component";
import {TextboxComponent} from "./controls/textbox/textbox.component";
import {SwitchComponent} from "./controls/switch/switch.component";
import {CheckboxComponent} from "./controls/checkbox/checkbox.component";
import {HelperTextComponent} from "./common/helper-text/helper-text.component";
import {ValidationFeedbackComponent} from "./common/validation-feedback/validation-feedback.component";
import {DynamicControlComponent} from "./common/dynamic-control/dynamic-control.component";
import {FormControlComponent} from "./common/form-control/form-control.component";
import {FileInputComponent} from './controls/file-input/file-input.component';
import {ObservableStringPipe} from './helpers/observable-string.pipe';


@NgModule({
  declarations: [
    DynamicFormComponent,
    MultiCheckboxComponent,
    SelectComponent,
    TextboxComponent,
    SwitchComponent,
    CheckboxComponent,
    HelperTextComponent,
    ValidationFeedbackComponent,
    DynamicControlComponent,
    FormControlComponent,
    FileInputComponent,
    ObservableStringPipe,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  exports: [
    DynamicFormComponent,
    MultiCheckboxComponent,
    SelectComponent,
    TextboxComponent,
    SwitchComponent,
    CheckboxComponent,
    HelperTextComponent,
    ValidationFeedbackComponent,
    DynamicControlComponent,
    FormControlComponent,
    FileInputComponent
  ]
})
export class DynamicFormModule {
}
