export const classicExamples = {
  ts: `import {
  CheckboxGroupInput,
  CheckboxInput,
  DropdownInput,
  DropdownOption,
  HiddenInput,
  RadioGroupInput,
  SwitchInput,
  TextAreaInput,
  TextBoxInput
} from "@yyasinaslan/dynamic-form";
import {Validators} from "@angular/forms";

export const eventTest = (event: any) => {
  console.log(\`Event: \${event.type}, value: \${event.value}\`)
}

export const testOptions: DropdownOption[] = [
  {label: 'Option 1', value: 1},
  {label: 'Option 2', value: 2},
  {label: 'Option 3', value: 3},
]

export const classicExamplesInputs = [
  new HiddenInput({
    key: 'hiddenInput',
    value: 'Hello',
    validators: [Validators.required],
    validatorsMessage: [{key: 'required', message: 'hiddenexample required'}]
  }),
  new TextBoxInput({
    key: 'textbox',
    value: '',
    label: 'TextBox with change handler',
    size: '6',
    readonly: false,
    validators: [Validators.required],
    validatorsMessage: [{key: 'required', message: 'Username required'}],
    change: eventTest,
    focus: eventTest,
    blur: eventTest,
    click: eventTest,
    contextMenu: eventTest,
  }),
  new TextBoxInput({
    key: 'passwordInput',
    type: 'password',
    value: '',
    label: 'Password Input',
    size: '6',
    validators: [Validators.required],
    validatorsMessage: [{key: 'required', message: 'required'}],
    change: eventTest,
    focus: eventTest,
    blur: eventTest,
    click: eventTest,
    contextMenu: eventTest,
  }),
  new TextBoxInput({
    key: 'floatingText',
    value: '',
    label: 'Floating label textBox',
    size: '12',
    floating: true,
    validators: [Validators.required],
    validatorsMessage: [{key: 'required', message: 'required'}],
    change: eventTest,
    focus: eventTest,
    blur: eventTest,
    click: eventTest,
    contextMenu: eventTest,
  }),
  new TextAreaInput({
    key: 'textarea',
    value: '',
    label: 'Textarea',
    size: '12',
    validators: [Validators.required],
    validatorsMessage: [{key: 'required', message: 'required'}],
    change: eventTest,
    focus: eventTest,
    blur: eventTest,
    click: eventTest,
    contextMenu: eventTest,
  }),
  new SwitchInput({
    key: 'switch',
    value: false,
    label: 'Switch example',
    size: '12',
    change: eventTest,
    focus: eventTest,
    blur: eventTest,
    click: eventTest,
    contextMenu: eventTest,
  }),
  new CheckboxInput({
    key: 'checkbox',
    value: false,
    label: 'Checkbox example',
    size: '12',
    change: eventTest,
    focus: eventTest,
    blur: eventTest,
    click: eventTest,
    contextMenu: eventTest,
  }),
  new DropdownInput({
    key: "dropdown",
    label: "Select",
    value: 5,
    validators: [Validators.required],
    validatorsMessage: [{key: "required", message: "Please enter your Time"}],
    multiple: false,
    options: testOptions,
    change: eventTest,
    focus: eventTest,
    blur: eventTest,
    click: eventTest,
    contextMenu: eventTest,
  }),
  new DropdownInput({
    key: "multipleDropdown",
    label: "Select Multiple",
    value: [6, 0, 2],
    validators: [Validators.required],
    validatorsMessage: [{key: "required", message: "Please enter your Time2"}],
    multiple: true,
    options: testOptions,
    change: eventTest,
    focus: eventTest,
    blur: eventTest,
    click: eventTest,
    contextMenu: eventTest,
  }),
  new CheckboxGroupInput({
    key: "checkboxGroup",
    label: "Checkbox group",
    size: "6",
    value: [8],
    validators: [Validators.required],
    validatorsMessage: [{key: "required", message: "Please enter your Time3"}],
    orientation: 'vertical',
    options: testOptions,
    change: eventTest,
    focus: eventTest,
    blur: eventTest,
    click: eventTest,
    contextMenu: eventTest,
  }),
  new RadioGroupInput({
    key: "radioGroup",
    label: "Radio group",
    size: "6",
    validators: [Validators.required],
    validatorsMessage: [{key: "required", message: "Please enter your Time3"}],
    orientation: 'vertical',
    value: '',
    options: testOptions,
    change: eventTest,
    focus: eventTest,
    blur: eventTest,
    click: eventTest,
    contextMenu: eventTest,
  }),
]`,

  html: `<ngy-dynamic-form #formComponent (post)="formPosted($event)" [formDisabled]="formDisabled" [inputs]="classicExamplesInputs"
                  [valueToPatch]="{textbox: 'Patched value'}" formName="classicExamples"></ngy-dynamic-form>`
}