import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {HelperTextDirective, TextboxComponent, ValidatorMessageDirective} from "dynamic-form";

@Component({
  selector: 'app-declarative-examples',
  standalone: true,
  imports: [CommonModule, TextboxComponent, FormsModule, ValidatorMessageDirective, HelperTextDirective],
  templateUrl: './declarative-examples.component.html',
  styleUrls: ['./declarative-examples.component.scss']
})
export class DeclarativeExamplesComponent {
  model1: string = '';

  eventTest(event: any) {
    console.log('eventTest', event.type)
  }
}
