import {AbstractControl, FormControl, ValidatorFn} from "@angular/forms";
import {randomString} from "dynamic-form/helpers/random-string";
import {Observable} from "rxjs";
import {ControlType} from "dynamic-form/interfaces/control-type";

export class BaseInput<T> {
  /**
   * Unique key that identify form control (Required)
   */
  key: string;

  /**
   * Initial value of form control
   */
  value?: T;

  /**
   * Form control label
   */
  label?: string | Observable<string>;

  /**
   * Indicates if input required
   */
  required?: boolean;

  /**
   * Form control order for auto layout (Not implemented)
   */
  order?: number;

  /**
   * Control type
   * Choose from predefined control types (Required)
   */
  controlType?: ControlType;

  /**
   * Reactive form validators
   * Use as an array of Angular validators or custom validator
   */
  validators?: ValidatorFn[];

  /**
   * Validator messages
   * key: Identifier of validator. Example: required, minlength
   * message: Validator message that will be shown
   */
  validatorsMessage?: { key: string; message: string | Observable<string> }[];

  /**
   * Size of form control (Column size)
   * You can use 1 to 12. It comes from bootstrap grid columns
   */
  size?: string | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';

  /**
   * Input scale for bootstrap
   */
  inputSize?: "" | "sm" | "lg";

  /**
   * ID of input
   * If you leave this empty it will be assigned automatically
   */
  id?: string;

  /**
   * Disable initially
   */
  disabled?: boolean;

  /**
   * Readonly
   */
  readonly?: boolean;

  /**
   * Form control helper text
   * It will show under or top of input according to styles
   */
  helperText?: string | Observable<string>;

  constructor(options: BaseInput<any>) {
    this.value = options.value;
    this.key = options.key ?? "";
    this.label = options.label ?? "";
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType ?? "textbox";
    this.validators = options.validators ?? [];
    this.validatorsMessage = options.validatorsMessage ?? [];
    this.size = options.size ?? "12";
    this.inputSize = options.inputSize ?? "";
    this.helperText = options.helperText ?? "";
    this.id = options.id ?? options.key + "_" + randomString(10);
    this.disabled = options.disabled ?? false;
    this.readonly = options.readonly ?? false;
  }

  /**
   * Create form control with validators
   */
  createFormControl(): AbstractControl {
    const control = new FormControl<T>(this.value as any, this.validators);
    if (this.disabled) {
      control.disable();
    }
    return control;
  }
}
