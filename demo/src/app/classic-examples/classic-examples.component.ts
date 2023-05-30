import {AfterViewInit, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormGroup} from "@angular/forms";
import {DynamicFormComponent, FormControlComponent} from "dynamic-form";
import {classicExamples} from "./classic-examples";
import {classicExamplesInputs} from "./classic-examples-inputs";

declare const hljs: any;

@Component({
  selector: 'app-classic-examples',
  standalone: true,
  imports: [CommonModule, DynamicFormComponent, FormControlComponent],
  templateUrl: './classic-examples.component.html',
  styleUrls: ['./classic-examples.component.scss']
})
export class ClassicExamplesComponent implements OnInit, AfterViewInit {

  classicExamples = classicExamples;

  classicExamplesInputs = classicExamplesInputs;

  formDisabled: boolean = false;
  hideTs: boolean = true;

  constructor() {
  }

  formPosted($event: FormGroup) {
    console.log('Form POSTED', $event.value)
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    hljs.highlightAll();
  }


}
