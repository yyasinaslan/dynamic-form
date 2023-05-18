import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BehaviorSubject, take, timer} from "rxjs";
import {FormGroup, Validators} from "@angular/forms";
import {
  CheckboxGroupInput,
  CheckboxInput,
  DropdownInput,
  DropdownOption,
  DynamicFormComponent,
  FileInput,
  HiddenInput,
  RadioGroupInput,
  SwitchInput,
  TextAreaInput,
  TextBoxInput
} from "dynamic-form";

@Component({
  selector: 'app-classic-examples',
  standalone: true,
  imports: [CommonModule, DynamicFormComponent],
  templateUrl: './classic-examples.component.html',
  styleUrls: ['./classic-examples.component.scss']
})
export class ClassicExamplesComponent implements OnInit {

  testObsString = new BehaviorSubject('Test label observable');

  testOptionLabelObs1 = new BehaviorSubject('Option label changeable 1')
  testOptionLabelObs2 = new BehaviorSubject('Option label changeable 2')

  testOptions: DropdownOption[] = [
    {label: 'Test1', value: 0},
    {label: this.testOptionLabelObs1, value: 1},
    {label: this.testOptionLabelObs2, value: 2},
  ]

  testOptionsObs = new BehaviorSubject<DropdownOption[]>([]);

  inputs = [
    new HiddenInput({
      key: 'hiddenexample',
      value: 'Hello',
      validators: [Validators.required],
      validatorsMessage: [{key: 'required', message: 'hiddenexample required'}]
    }),
    new TextBoxInput({
      key: 'textboxexample',
      value: '',
      label: 'TextBox with change handler',
      size: '6',
      readonly: false,
      validators: [Validators.required],
      validatorsMessage: [{key: 'required', message: 'Username required'}],
      change: (value) => {
        console.log('value changed', value)
      },
      focus: (event) => {
        console.log('Event triggered for textbox', event.type)
      },
      blur: (event) => {
        console.log('Event triggered for textbox', event.type)
      },
      click: (event) => {
        console.log('Event triggered for textbox', event.type)
      },
      contextMenu: (event) => {
        console.log('Event triggered for textbox', event.type)
      },
    }),
    new TextBoxInput({
      key: 'textbox2example',
      type: 'password',
      value: '',
      label: this.testObsString,
      size: '6',
      validators: [Validators.required],
      validatorsMessage: [{key: 'required', message: 'Username required'}]
    }),
    new FileInput({
      key: 'fileinputexample',
      label: 'File input',
      validators: [Validators.required],
      validatorsMessage: [{key: 'required', message: 'Username required'}]
    }),
    new TextBoxInput({
      key: 'floatingtextexample',
      value: '',
      label: 'Floating label textBox',
      size: '12',
      floating: true,
      validators: [Validators.required],
      validatorsMessage: [{key: 'required', message: 'Username required'}]
    }),
    new TextAreaInput({
      key: 'textareaexample',
      value: '',
      label: 'Textarea',
      size: '12',
      validators: [Validators.required],
      validatorsMessage: [{key: 'required', message: 'Username required'}]
    }),
    new SwitchInput({
      key: 'switchexample',
      value: false,
      label: 'Switch example',
      size: '12'
    }),
    new CheckboxInput({
      key: 'checkboxexample',
      value: false,
      label: 'Checkbox example',
      size: '12'
    }),
    new DropdownInput({
      key: "time",
      label: "Select",
      value: 5,
      validators: [Validators.required],
      validatorsMessage: [{key: "required", message: "Please enter your Time"}],
      multiple: false,
      options: this.testOptions,
    }),
    new DropdownInput({
      key: "time2",
      label: "Select Multiple",
      value: [6, 0, 2],
      validators: [Validators.required],
      validatorsMessage: [{key: "required", message: "Please enter your Time2"}],
      multiple: true,
      options: this.testOptionsObs,
    }),
    new CheckboxGroupInput({
      key: "time3",
      label: "Checkbox group",
      size: "6",
      value: [8],
      validators: [Validators.required],
      validatorsMessage: [{key: "required", message: "Please enter your Time3"}],
      orientation: 'vertical',
      options: this.testOptions,
    }),
    new RadioGroupInput({
      key: "time4",
      label: "Radio group",
      size: "6",
      validators: [Validators.required],
      validatorsMessage: [{key: "required", message: "Please enter your Time3"}],
      orientation: 'vertical',
      value: '',
      options: this.testOptionsObs,
    }),
  ]
  formDisabled: boolean = false;

  constructor() {
  }

  formPosted($event: FormGroup) {
    console.log('Form POSTED', $event.value)
  }

  ngOnInit(): void {
    timer(0, 1000).subscribe((value) => {
      this.testObsString.next('Test obseerver' + value)
      this.testOptionLabelObs1.next('1Test option label ' + value)
    })

    timer(0, 500).subscribe((value) => {
      this.testOptionLabelObs2.next('2Test option label ' + value)
    })

    timer(0, 10).pipe(take(10)).subscribe((value) => {
      if (value == 2) {
        this.testOptionsObs.next([...this.testOptionsObs.getValue(), this.testOptions[2]])
      } else {
        this.testOptionsObs.next([...this.testOptionsObs.getValue(), {label: 'Test ' + value, value: value}])
      }
    })
  }
}
