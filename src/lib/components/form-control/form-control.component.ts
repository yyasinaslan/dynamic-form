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
import {CommonModule} from "@angular/common";
import {MultiCheckboxComponent} from "../../controls/multi-checkbox/multi-checkbox.component";
import {CheckboxComponent} from "../../controls/checkbox/checkbox.component";
import {FileInputComponent} from "../../controls/file-input/file-input.component";
import {HelperTextComponent} from "../helper-text/helper-text.component";
import {SelectComponent} from "../../controls/select/select.component";
import {TextboxComponent} from "../../controls/textbox/textbox.component";
import {ValidationFeedbackComponent} from "../validation-feedback/validation-feedback.component";
import {TextareaComponent} from "../../controls/textarea/textarea.component";
import {AnyInput} from "../../interfaces/any-input.interface";
import {ArrayInput} from "../../common/array-input";
import {GroupInput} from "../../common/group-input";

@Component({
  selector: "ngy-form-control",
  standalone: true,
  templateUrl: "./form-control.component.html",
  styleUrls: ["./form-control.component.scss"],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CheckboxComponent,
    FileInputComponent,
    HelperTextComponent,
    MultiCheckboxComponent,
    SelectComponent,
    TextboxComponent,
    ValidationFeedbackComponent,
    TextareaComponent,
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
