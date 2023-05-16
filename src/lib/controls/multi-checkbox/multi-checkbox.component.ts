import {Component, Input, OnChanges, OnDestroy, OnInit, Optional, SimpleChanges} from "@angular/core";
import {ControlValueAccessor, NgControl} from "@angular/forms";
import {DynamicControlInterface} from "../../interfaces/dynamic-control.interface";
import {Observable, Subscription} from "rxjs";
import {DropdownOption} from "dynamic-form/interfaces/dropdown-option.interface";
import {CheckboxInput} from "dynamic-form/common/checkbox-input";
import {CommonModule} from "@angular/common";
import {ObservableStringPipe} from "dynamic-form/pipes/observable-string.pipe";
import {CheckboxGroupInput} from "dynamic-form/common/checkbox-group-input";

@Component({
  selector: "ngy-multi-checkbox",
  standalone: true,
  templateUrl: "./multi-checkbox.component.html",
  styleUrls: ["./multi-checkbox.component.scss"],
  imports: [
    CommonModule,
    ObservableStringPipe
  ]
})
export class MultiCheckboxComponent implements ControlValueAccessor, DynamicControlInterface, OnDestroy, OnChanges, OnInit {
  @Optional() @Input() formName: string = "";
  @Input() input!: CheckboxGroupInput<any>;
  @Input() disabled: boolean = false;

  @Input() localizations = {
    "select_all": "Select All",
    "deselect_all": "Deselect All"
  }
  _options: DropdownOption[] = [];
  val: any;
  private optionSub?: Subscription;

  constructor(public control: NgControl) {
    control.valueAccessor = this;
  }

  @Optional() @Input() compareWith: (a: any, b: any) => boolean = (a: any, b: any) => {
    return a === b;
  };

  onChange: (value: any) => void = () => {
  };

  onTouched: () => void = () => {
  };

  public registerOnChange(fn: (value: any | null) => void) {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  valIncludes(arr: Array<any>, value: any) {
    if (!Array.isArray(arr)) return false;
    return arr.findIndex(v => this.compareWith(v, value)) > -1;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  writeValue(obj: any) {
    this.val = obj;
  }

  checkboxChanged($event: Event, value: any) {
    this.markAsTouched();

    const checked = ($event.target as HTMLInputElement).checked;

    this.setArrayValue(checked, value);
  }

  labelClick(option: DropdownOption) {
    if (this.control.disabled) return;

    this.makeArray();

    if (this.input.controlType == "radiogroup") {
      this.radioChanged(option.value);
      return;
    }

    this.setArrayValue(!this.val.includes(option.value), option.value);
  }

  setArrayValue(checked: boolean, optionValue: any) {
    this.makeArray();

    if (this.val.includes(optionValue)) {
      if (!checked) {
        this.val.splice(
          this.val.findIndex((v: any) => this.compareWith(v, optionValue)),
          1
        );
      }
    } else {
      if (checked) {
        this.val.push(optionValue);
      }
    }

    this.onChange(this.val);
  }

  markAsTouched() {
    this.onTouched();
  }

  selectAll() {
    const options = this.input.options;

    if (!options) {
      return;
    }

    this.val = this._options.map((opt) => {
      return opt.value;
    });

    this.onChange(this.val);
  }

  deselectAll() {
    this.val = [];

    this.onChange(this.val);
  }

  radioChanged(value: any) {
    this.val = value;
    this.onChange(this.val);
  }

  ngOnDestroy(): void {
    this.desubOptions();
  }

  ngOnInit(): void {
    this.subOptions();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['input']) {
      this.desubOptions();
      this.subOptions();
    }
  }

  subOptions() {
    if (this.input.options instanceof Observable) {
      this.optionSub = this.input.options.subscribe((options) => {
        this._options = options;
      });
      return;
    }

    this._options = this.input.options as DropdownOption[];
  }

  desubOptions() {
    if (this.input.options instanceof Observable && this.optionSub) {
      this.optionSub.unsubscribe();
    }
  }

  private makeArray() {
    // If initial or current value is not array we must ensure we have an array
    if (!Array.isArray(this.val)) {
      this.val = [];
    }
  }
}
