import {FormArray} from "@angular/forms";
import {ControlType} from "../interfaces/control-type";
import {BaseInput} from "./base-input";
import {AnyInput} from "../interfaces/any-input.interface";
/**
 * Array input
 * !!! Not production ready
 */
export class ArrayInput<T> extends BaseInput<T> {
  override controlType: ControlType = "array";

  override value?: T;

  input!: AnyInput;

  constructor(options: ArrayInput<T>) {
    super(options);
    this.value = options.value ?? undefined;
    this.key = options.key ?? "";
    this.validators = options.validators ?? [];
    this.validatorsMessage = options.validatorsMessage ?? [];
    this.size = options.size ?? "";
    this.helperText = options.helperText ?? "";

    this.input = options.input ?? [];
  }

  override createFormControl() {
    const val = this.value as Array<T>;

    const controls: any[] = val.map((v) => {
      const control = this.input.createFormControl();
      control.patchValue(v);
      return control;
    });

    return new FormArray(controls, this.validators);
  }
}
