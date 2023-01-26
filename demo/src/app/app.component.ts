import {Component} from '@angular/core';
import {FormGroup, Validators} from "@angular/forms";
import {DropdownInput, TextBoxInput} from "dynamic-form";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'demo';


  inputs = [
    new TextBoxInput({
      key: 'user_first_name',
      value: '',
      label: 'Firstname',
      size: '6',
      validators: [Validators.required],
      validatorsMessage: [{key: 'required', message: 'Username required'}]
    }),
    new TextBoxInput({
      key: 'user_last_name',
      value: '',
      label: 'Lastname',
      size: '6',
      validators: [Validators.required],
      validatorsMessage: [{key: 'required', message: 'Username required'}]
    }),
    new DropdownInput({
      key: "time",
      label: "Time",
      placeholder: "Choose...",
      size: "6",
      value: "",
      validators: [Validators.required],
      validatorsMessage: [{ key: "required", message: "Please enter your Time" }],
      multiple: false,
      options: [
        { label: "Choose", value: "" },
        { label: "08:00", value: "08:00" },
        { label: "09:00", value: "09:00" },
      ],
    }),
  ]

  formPosted($event: FormGroup) {
    console.log('Form POSTED', $event.value)
  }
}
