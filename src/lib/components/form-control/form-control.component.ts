import {
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import {FormArray, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Subscription} from "rxjs";
import {AnyInput} from "dynamic-form/interfaces/any-input.interface";
import {ArrayInput} from "dynamic-form/common/array-input";
import {GroupInput} from "dynamic-form/common/group-input";
import {CommonModule} from "@angular/common";
import {DynamicControlComponent} from "dynamic-form/components/dynamic-control/dynamic-control.component";

@Component({
  selector: "ngy-form-control",
  standalone: true,
  templateUrl: "./form-control.component.html",
  styleUrls: ["./form-control.component.scss"],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicControlComponent,
  ]
})
export class FormControlComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() path!: string;
  @Input() fGroup!: FormGroup;

  @Input() input?: AnyInput;
  @Input() formName!: string;

  /**
   * Use it only array items are form group
   * Otherwise this won't work
   */
  @Input() groupTemplate!: TemplateRef<any> | null;
  @Input() arrayItemIndex?: number;

  @ViewChild("groupTemplateContainer") groupTemplateContainer?: ElementRef<any>;

  @ContentChildren(FormControlComponent, {descendants: true})
  templateChildren!: QueryList<FormControlComponent>;
  templateChildrenSub?: Subscription;

  constructor() {
  }

  get inputAsArray() {
    return this.input as ArrayInput<any>;
  }

  get arrayItems() {
    const fArray = this.fGroup.get(this.path) as FormArray;
    return fArray.controls;
  }

  get groupInputs() {
    return (this.input as GroupInput<any>).inputs;
  }

  get groupInputsWithKey() {
    const inputs: { [key: string]: AnyInput } = {};
    (this.input as GroupInput<any>).inputs.forEach((i) => {
      inputs[i.key] = i;
    });
    return inputs;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (this.groupTemplateContainer) {
      this.loadTemplateControls();
    }
    // this.templateChildrenSub = this.templateChildren.changes.pipe(delay(0)).subscribe((changes) => {
    //   // console.log("templateChildren Changes", this.templateChildren);
    // });
  }

  ngOnDestroy(): void {
    if (this.templateChildrenSub) {
      this.templateChildrenSub.unsubscribe();
    }
  }

  private loadTemplateControls() {
    // console.log("groupTemplateContainer", this.groupTemplateContainer);
    // console.log("templateChildren", this.templateChildren);
  }
}
