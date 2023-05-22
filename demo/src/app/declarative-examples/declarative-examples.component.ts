import {AfterViewInit, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {HelperTextDirective, TextareaComponent, TextboxComponent, ValidatorMessageDirective} from "dynamic-form";

declare const hljs: any;

@Component({
  selector: 'app-declarative-examples',
  standalone: true,
  imports: [CommonModule, TextboxComponent, FormsModule, ValidatorMessageDirective, HelperTextDirective, TextareaComponent],
  templateUrl: './declarative-examples.component.html',
  styleUrls: ['./declarative-examples.component.scss']
})
export class DeclarativeExamplesComponent implements AfterViewInit {
  model1: string = '';
  model2: string = '';
  eventLog: any[] = [];

  eventTest(event: any) {
    if (this.eventLog.length > 100)
      this.eventLog.pop();
    const target = event.target as HTMLInputElement;
    this.eventLog.unshift({
      target: target ? target.tagName.toLowerCase() + '#' + target.getAttribute('name') : '---',
      type: event.type,
      value: (target ? target.value : '---')
    })
  }

  ngAfterViewInit(): void {
    hljs.highlightAll();
    // console.log(hljs)
    // document.querySelectorAll('pre code').forEach((el) => {
    //   hljs.highlight(el);
    // });
  }

  codeExamples = {
    'textbox': `<ngy-textbox label="Label of textbox"
      key="textBox"
      (ngyChange)="eventTest($event)"
      (ngyFocus)="eventTest($event)"
      (ngyBlur)="eventTest($event)"
      (ngyClick)="eventTest($event)"
      (ngyContextMenu)="eventTest($event)"

      name="textBox"
      [(ngModel)]="model1"
      [required]="true" [minlength]="5" [maxlength]="10"
>
  <ng-template ngyHelperText>This is helper text</ng-template>

  <ng-template ngyValidatorMessage="required">Required</ng-template>
  <ng-template ngyValidatorMessage="minlength">Min length must be 5</ng-template>
  <ng-template ngyValidatorMessage="maxlength">Max length must be 10</ng-template>
</ngy-textbox>`,
    textarea: `<ngy-textarea label="Textarea"
      key="textArea"
      [(ngModel)]="model2"
      name="textArea"
      (ngyChange)="eventTest($event)"
      (ngyFocus)="eventTest($event)"
      (ngyBlur)="eventTest($event)"
      (ngyClick)="eventTest($event)"
      (ngyContextMenu)="eventTest($event)"
      [required]="true" [minlength]="5" [maxlength]="10"
      >
  <ng-template ngyHelperText>This is helper text</ng-template>

  <ng-template ngyValidatorMessage="required">Textbox required</ng-template>
  <ng-template ngyValidatorMessage="minlength">Textbox min length must be 5</ng-template>
  <ng-template ngyValidatorMessage="maxlength">Textbox max length must be 10</ng-template>
</ngy-textarea>`
  }
}
