import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from "@angular/core";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {FormControlComponent} from "dynamic-form/components/form-control/form-control.component";
import {delay, Subscription} from "rxjs";
import {AnyInput} from "dynamic-form/interfaces/any-input.interface";
import {createFormGroup} from "dynamic-form/helpers/create-form-group";
import {CommonModule} from "@angular/common";

@Component({
  selector: "ngy-dynamic-form",
  standalone: true,
  templateUrl: "./dynamic-form.component.html",
  styleUrls: ["./dynamic-form.component.scss"],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormControlComponent
  ],
  encapsulation: ViewEncapsulation.None
})
export class DynamicFormComponent implements OnInit, OnDestroy, AfterViewInit, AfterContentInit, OnChanges {
  @Input("inputs") inputs: AnyInput[] = [];
  @Input("formName") formName: string = "";
  @Input("formTitle") formTitle: string = "";
  @Input("formSubmitLabel") formSubmitLabel: string = 'Save';
  @Input("formDisabled") formDisabled: boolean = false;
  @Input("showSubmitButton") showSubmitButton: boolean = true;

  @Input("valueToPatch") valueToPatch?: any;

  /**
   * Dynamic controls for custom layout
   * if this is empty auto layout will take place
   */
  @ContentChildren(FormControlComponent, {
    descendants: true
  })
  dynamicControls?: QueryList<FormControlComponent>;

  @Output("post") submitEmitter: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  /**
   * Input templates
   */
  @ViewChild("textBoxTemplate") textBoxTemplate?: TemplateRef<any>;
  @ViewChild("textBoxFloatingTemplate") textBoxFloatingTemplate?: TemplateRef<any>;
  @ViewChild("dropDownTemplate") dropDownTemplate?: TemplateRef<any>;
  @ViewChild("textAreaTemplate") textAreaTemplate?: TemplateRef<any>;
  @ViewChild("switchTemplate") switchTemplate?: TemplateRef<any>;
  @ViewChild("checkboxTemplate") checkboxTemplate?: TemplateRef<any>;
  @ViewChild("checkboxGroupTemplate") checkboxGroupTemplate?: TemplateRef<any>;
  @ViewChild("radioGroupTemplate") radioGroupTemplate?: TemplateRef<any>;

  form!: FormGroup;
  validated = false;
  submitted = false;

  dynamicControlsSub?: Subscription;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    if (this.dynamicControlsSub) {
      this.dynamicControlsSub.unsubscribe();
    }
  }

  ngAfterViewInit(): void {
  }

  ngAfterContentInit(): void {
    if (!this.inputs || this.inputs.length == 0) return;

    // Creating form group from inputs type
    this.form = createFormGroup(this.inputs);

    if (this.valueToPatch) {
      this.patchValue(this.valueToPatch);
    }

    this.loadDynamicControls();

    // console.log(this.dynamicControls);
    if (this.dynamicControls) {
      this.dynamicControlsSub = this.dynamicControls.changes.pipe(delay(0)).subscribe((dn) => {
        // console.log("Dynamic changed", dn);
        this.loadDynamicControls();
      });
    }

  }

  loadDynamicControls() {
    if (this.dynamicControls) {
      this.dynamicControls.forEach((control) => {
        if (control.fGroup || control.input) {
          return;
        }
        const ctrlInput = this.inputs.find((i) => i.key == control.path);
        if (!ctrlInput) {
          return;
        }
        control.input = ctrlInput;
        control.formName = this.formName;
        control.fGroup = this.form;
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["formDisabled"]) {
      if (changes["formDisabled"].currentValue == true) {
        this.form?.disable();
      } else {
        this.form?.enable();
      }
    }

    // If inputs changed recreate form
    if (changes["inputs"]) {
      // console.log("inputs changed");
      this.form = createFormGroup(changes["inputs"].currentValue);
    }
  }

  getValue(controlKey: string): any {
    const control = this.form?.get(controlKey);
    if (!control) return null;

    return control.value;
  }

  getControl(controlKey: string): any {
    const control = this.form?.get(controlKey);
    if (!control) return null;

    return control;
  }

  isInvalid(key: string) {
    const formControl = this.form?.get(key);

    if (!formControl) return true;

    return formControl.invalid;
  }

  getColumnClass(input: AnyInput) {
    const classList = [];

    if (!input.size) {
      classList.push("col-md");
    } else {
      classList.push("col-md-" + input.size);
    }

    return classList.join(" ");
  }

  submitForm() {
    if (this.formDisabled) {
      return false;
    }

    this.submitted = true;

    if (!this.validated) {
      this.validated = true;
    }

    if (!this.form) {
      return false;
    }

    if (this.form.invalid) {
      return false;
    }

    this.submitEmitter.emit(this.form);

    return false;
  }

  patchValue(val: any) {
    this.form.patchValue(val);
  }

  removeItemFromArray(controlKey: string, i: number) {
  }

  addItemToArray(controlKey: string) {
  }
}
