import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AnyInput, ComboboxInput, DropdownInput, DynamicFormComponent} from "dynamic-form";
import {Validators} from "@angular/forms";
import {eventTest, testOptions} from "../classic-examples/classic-examples-inputs";

@Component({
  selector: 'app-modal-example',
  standalone: true,
  imports: [CommonModule, DynamicFormComponent],
  templateUrl: './modal-example.component.html',
  styleUrls: ['./modal-example.component.scss']
})
export class ModalExampleComponent {

  inputs: AnyInput[] = [
    new ComboboxInput({
      key: "modal_combobox",
      label: "Combobox Multi in Modal",
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
  ]

}
