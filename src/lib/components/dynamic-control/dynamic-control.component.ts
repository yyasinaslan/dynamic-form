import {AfterContentInit, AfterViewInit, Component, Input, OnInit} from "@angular/core";
import {FormArray, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {AnyInput} from "dynamic-form/interfaces/any-input.interface";
import {CommonModule} from "@angular/common";
import {TextboxComponent} from "dynamic-form/controls/textbox/textbox.component";
import {FileInputComponent} from "dynamic-form/controls/file-input/file-input.component";
import {SelectComponent} from "dynamic-form/controls/select/select.component";
import {SwitchComponent} from "dynamic-form/controls/switch/switch.component";
import {CheckboxComponent} from "dynamic-form/controls/checkbox/checkbox.component";
import {MultiCheckboxComponent} from "dynamic-form/controls/multi-checkbox/multi-checkbox.component";
import {HelperTextComponent} from "dynamic-form/components/helper-text/helper-text.component";
import {ValidationFeedbackComponent} from "dynamic-form/components/validation-feedback/validation-feedback.component";

@Component({
  selector: "dynamic-control",
  standalone: true,
  templateUrl: "./dynamic-control.component.html",
  styleUrls: ["./dynamic-control.component.scss"],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TextboxComponent,
    FileInputComponent,
    SelectComponent,
    SwitchComponent,
    CheckboxComponent,
    MultiCheckboxComponent,
    HelperTextComponent,
    ValidationFeedbackComponent
  ]
})
export class DynamicControlComponent implements OnInit, AfterViewInit, AfterContentInit {
  @Input() path!: string;

  @Input() fArray!: FormArray;
  @Input() fGroup!: FormGroup;
  @Input() input?: AnyInput;
  @Input() formName!: string;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
  }

  ngAfterViewInit(): void {
  }
}
