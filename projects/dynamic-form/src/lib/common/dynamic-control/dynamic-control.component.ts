import {AfterContentInit, AfterViewInit, Component, Input, OnInit} from "@angular/core";
import {FormArray, FormGroup} from "@angular/forms";
import {AnyInput} from "../../helpers/dynamic-form.interface";

@Component({
  selector: "dynamic-control",
  templateUrl: "./dynamic-control.component.html",
  styleUrls: ["./dynamic-control.component.scss"],
})
export class DynamicControlComponent implements OnInit, AfterViewInit, AfterContentInit {
  @Input() path!: string;

  @Input() fArray!: FormArray;
  @Input() fGroup!: FormGroup;
  @Input() input?: AnyInput;
  @Input() formName!: string;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
  }

  ngAfterViewInit(): void {
  }
}
