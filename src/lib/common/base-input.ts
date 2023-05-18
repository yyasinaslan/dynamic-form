import {AbstractControl, FormControl, ValidatorFn} from "@angular/forms";
import {Observable} from "rxjs";
import {BaseInputInterface} from "../interfaces/base-input.interface";
import {ControlType} from "../interfaces/control-type";
import {randomString} from "../helpers/random-string";

export class BaseInput<T> implements BaseInputInterface<T> {
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

  // Event handlers
  change?: (value: T) => void
  focus?: (event: FocusEvent) => void
  blur?: (event: FocusEvent) => void
  click?: (event: MouseEvent) => void
  contextMenu?: (event: MouseEvent) => void

  constructor(config: BaseInputInterface<T>) {
    this.value = config.value;
    this.key = config.key ?? "";
    this.label = config.label ?? "";
    this.required = !!config.required;
    this.order = config.order === undefined ? 1 : config.order;
    this.controlType = config.controlType ?? "textbox";
    this.validators = config.validators ?? [];
    this.validatorsMessage = config.validatorsMessage ?? [];
    this.size = config.size ?? "12";
    this.inputSize = config.inputSize ?? "";
    this.helperText = config.helperText ?? "";
    this.id = config.id ?? config.key + "_" + randomString(10);
    this.disabled = config.disabled ?? false;
    this.readonly = config.readonly ?? false;


    this.change = config.change ?? undefined;
    this.focus = config.focus ?? undefined;
    this.blur = config.blur ?? undefined;
    this.click = config.click ?? undefined;
    this.contextMenu = config.contextMenu ?? undefined;

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
