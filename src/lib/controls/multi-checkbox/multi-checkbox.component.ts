import {Component, Input, Optional} from "@angular/core";
import {ControlValueAccessor, NgControl} from "@angular/forms";
import {CheckboxInput, DropdownOption} from "../../helpers/dynamic-form.interface";
import {DynamicControlInterface} from "../../helpers/dynamic-control.interface";

@Component({
  selector: "ngy-multi-checkbox",
  templateUrl: "./multi-checkbox.component.html",
  styleUrls: ["./multi-checkbox.component.scss"],
})
export class MultiCheckboxComponent implements ControlValueAccessor, DynamicControlInterface {
  @Optional() @Input() formName: string = "";
  @Input() input!: CheckboxInput<any>;
  @Input() disabled: boolean = false;

  val: any;

  constructor(public control: NgControl) {
    control.valueAccessor = this;
  }

  onChange: (value: any) => void = () => {
  };

  onTouched: () => void = () => {
  };

  compareWith: (a: any, b: any) => boolean = (a: any, b: any) => {
    return a == b;
  };

  public registerOnChange(fn: (value: any | null) => void) {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void) {
    this.onTouched = fn;
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

  private makeArray() {
    // If initial or current value is not array we must ensure we have an array
    if (!Array.isArray(this.val)) {
      this.val = [];
    }
  }

  labelClick(option: DropdownOption) {
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

    this.val = options.map((opt) => {
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
}
