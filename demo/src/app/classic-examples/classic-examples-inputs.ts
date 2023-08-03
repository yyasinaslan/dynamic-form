import {
  CheckboxGroupInput,
  CheckboxInput,
  ComboboxInput,
  DropdownInput,
  DropdownOption,
  HiddenInput,
  RadioGroupInput,
  SwitchInput,
  TextAreaInput,
  TextBoxInput
} from "dynamic-form";
import {Validators} from "@angular/forms";
import {Subject} from "rxjs";

export const eventTest = (event: any) => {
  // console.log(`Event: ${event.type}, value: ${event.value}`)
}

export const testOptions: DropdownOption[] = [
  {label: 'USA', value: 1},
  {label: 'Turkey', value: 2},
  {label: 'Egypt', value: 3},
  {label: 'England', value: 4},
  {label: 'France', value: 5},
  {label: 'Germany', value: 6},
  {label: 'Ireland', value: 7},
]

const asyncOptions = new Subject<DropdownOption[]>();

export const classicExamplesInputs = [
  new ComboboxInput({
    key: "combobox",
    label: "Combobox",
    size: "4",
    value: 2,
    validators: [Validators.required],
    validatorsMessage: [{key: "required", message: "Please enter your Time"}],
    multiple: false,
    options: testOptions,

    floating: false,

    search: (event => console.log('Search event', event)),
    searchType: 'client',

    change: eventTest,
    focus: eventTest,
    blur: eventTest,
    click: eventTest,
    contextMenu: eventTest,
  }),
  new ComboboxInput({
    key: "combobox_api",
    label: "Combobox Async Api Search",
    size: "4",
    value: 2,
    validators: [Validators.required],
    validatorsMessage: [{key: "required", message: "Please enter your Time"}],
    multiple: false,
    options: asyncOptions,

    floating: false,

    search: (searchTerm => {
      fetch('https://restcountries.com/v3.1/all?fields=name,capital,currencies').then(async response => {
        const countries = await response.json() as Array<{ name: { common: string } }>;
        if (!searchTerm) {
          asyncOptions.next(countries.map((c, i) => ({label: c.name.common, value: c.name.common})))
          return
        }

        asyncOptions.next(countries.filter(c => c.name.common.toLowerCase().includes(searchTerm.toLowerCase())).map((c, i) => ({
          label: c.name.common,
          value: c.name.common
        })))

      })
    }),
    searchType: 'server',

    change: eventTest,
    focus: eventTest,
    blur: eventTest,
    click: eventTest,
    contextMenu: eventTest,
  }),
  new ComboboxInput({
    key: "combobox_floating",
    label: "Combobox Floating",
    size: "4",
    value: 2,
    validators: [Validators.required],
    validatorsMessage: [{key: "required", message: "Please enter your Time"}],
    multiple: false,
    showClearButton: true,
    options: testOptions,

    floating: true,

    search: (event => console.log('Search event', event)),
    searchType: 'client',

    change: eventTest,
    focus: eventTest,
    blur: eventTest,
    click: eventTest,
    contextMenu: eventTest,
  }),
  new ComboboxInput({
    key: "combobox_multi",
    label: "Combobox Multi",
    size: "4",
    value: [1, 2],
    validators: [Validators.required],
    validatorsMessage: [{key: "required", message: "Please enter your Time"}],
    multiple: true,
    options: testOptions,

    showClearButton: true,

    floating: false,

    search: (event => console.log('Search event', event)),
    searchType: 'client',

    change: eventTest,
    focus: eventTest,
    blur: eventTest,
    click: eventTest,
    contextMenu: eventTest,
  }),

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
]
