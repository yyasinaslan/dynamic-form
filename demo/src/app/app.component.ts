import {Component} from '@angular/core';
import {FormGroup, Validators} from "@angular/forms";
import {DropdownInput, TextBoxInput} from "dynamic-form";
import {DropdownOption} from "../../../src/lib/helpers/dynamic-form.interface";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'demo';

  testOptions: DropdownOption[] = [
    {label: 'Test1', value: 0},
    {label: 'Test2', value: 1},
    {label: 'Test3', value: 2},
  ]

  inputs = [
    new TextBoxInput({
      key: 'user_first_name',
      value: '',
      label: 'Firstname',
      validators: [Validators.required],
      validatorsMessage: [{key: 'required', message: 'Username required'}]
    }),
    new TextBoxInput({
      key: 'user_last_name',
      value: '',
      label: 'Lastname',
      validators: [Validators.required],
      validatorsMessage: [{key: 'required', message: 'Username required'}]
    }),
    new DropdownInput({
      key: "time",
      label: "Time",
      value: 1,
      validators: [Validators.required],
      validatorsMessage: [{key: "required", message: "Please enter your Time"}],
      multiple: false,
      options: this.testOptions,
    }),
    new DropdownInput({
      key: "time2",
      label: "Time Multiple",
      value: [0],
      validators: [Validators.required],
      validatorsMessage: [{key: "required", message: "Please enter your Time2"}],
      multiple: true,
      options: this.testOptions,
    }),
    // new DropdownInput({
    //   key: "time2",
    //   label: "Time2",
    //   placeholder: "Choose...",
    //   size: "6",
    //   value: [],
    //   validators: [Validators.required],
    //   validatorsMessage: [{ key: "required", message: "Please enter your Time2" }],
    //   multiple: true,
    //   options: this.testOptions,
    // }),
    // new CheckboxGroupInput({
    //   key: "time3",
    //   label: "Time3",
    //   placeholder: "Choose...",
    //   size: "6",
    //   value: [],
    //   validators: [Validators.required],
    //   validatorsMessage: [{ key: "required", message: "Please enter your Time3" }],
    //   orientation: 'vertical',
    //   options: this.testOptions,
    // }),
    // new RadioGroupInput({
    //   key: "time4",
    //   label: "Time4",
    //   placeholder: "Choose...",
    //   size: "6",
    //   value: [],
    //   validators: [Validators.required],
    //   validatorsMessage: [{ key: "required", message: "Please enter your Time3" }],
    //   orientation: 'vertical',
    //   options: this.testOptions,
    // }),
  ]

  formPosted($event: FormGroup) {
    console.log('Form POSTED', $event.value)
  }
}
