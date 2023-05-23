import {AfterViewInit, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {
  HelperTextDirective,
  OptionComponent,
  SelectComponent,
  SwitchComponent,
  TextareaComponent,
  TextboxComponent,
  ValidatorMessageDirective
} from "dynamic-form";
import {codeExamples} from "../../code-examples";

declare const hljs: any;

@Component({
  selector: 'app-declarative-examples',
  standalone: true,
  imports: [CommonModule, TextboxComponent, FormsModule, ValidatorMessageDirective, HelperTextDirective, TextareaComponent, SelectComponent, OptionComponent, SwitchComponent],
  templateUrl: './declarative-examples.component.html',
  styleUrls: ['./declarative-examples.component.scss']
})
export class DeclarativeExamplesComponent implements AfterViewInit {
  model1: string = '';
  model2: string = '';
  model3: string = '';
  eventLog: any[] = [];

  //<editor-fold desc="Event test">
  eventTest(event: any) {
    if (this.eventLog.length > 100)
      this.eventLog.pop();
    const target = event.target as HTMLInputElement;
    this.eventLog.unshift({
      target: target ? target.tagName.toLowerCase() + '#' + target.getAttribute('name') : '---',
      type: event.type,
      value: event.value ?? (target ? target.value : '---')
    })
  }

  ngAfterViewInit(): void {
    hljs.highlightAll();
  }

  //</editor-fold>

  //<editor-fold desc="Fixtures">
  codeExamples = codeExamples;
  //</editor-fold>
}
