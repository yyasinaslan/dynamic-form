import {AfterViewInit, Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormGroup} from "@angular/forms";
import {DynamicFormComponent, FormControlComponent} from "dynamic-form";
import {classicExamples} from "./classic-examples";
import {classicExamplesInputs} from "./classic-examples-inputs";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalExampleComponent} from "../modal-example/modal-example.component";

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

  modalService = inject(NgbModal);

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

  showModal() {
    this.modalService.open(ModalExampleComponent, {
      size: 'xl'
    })
  }


}
