import {AfterViewInit, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {
  CheckboxComponent,
  HelperTextComponent,
  InvalidMessageComponent,
  MultiCheckboxComponent,
  OptionComponent,
  SelectComponent,
  TextareaComponent,
  TextboxComponent,
} from "dynamic-form";
import {codeExamples} from "../../code-examples";

declare const hljs: any;

@Component({
  selector: 'app-declarative-examples',
  standalone: true,
  imports: [CommonModule, FormsModule, TextboxComponent,
    TextareaComponent, SelectComponent, OptionComponent,
    CheckboxComponent, MultiCheckboxComponent, HelperTextComponent, InvalidMessageComponent],
  templateUrl: './template-driven-examples.component.html',
  styleUrls: ['./template-driven-examples.component.scss']
})
export class TemplateDrivenExamplesComponent implements AfterViewInit {
  eventLog: any[] = [];
  //<editor-fold desc="Fixtures">
  codeExamples = codeExamples;

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

  //</editor-fold>
  ngAfterViewInit(): void {
    hljs.highlightAll();
  }
  //</editor-fold>
}
