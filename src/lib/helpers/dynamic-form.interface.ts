import {AbstractControl, FormArray, FormControl, FormGroup, ValidatorFn} from "@angular/forms";
import {Observable} from "rxjs";

// Extended implementation from this tutorial
// https://angular.io/guide/dynamic-form

/**
 * Characters for generating random string
 */
const CHARS = "abcdefghijklmnopqrstuwxyz0123456789";

/**
 * Generate random string with given length
 * @param len
 */
function randomString(len: number = 6) {
  let str = "";
  for (let i = 0; i < len; i++) {
    str += CHARS.charAt(Math.round(Math.random() * CHARS.length));
  }
  return str;
}

/**
 * Dropdown option type
 */
export interface DropdownOption<T = any> {
  label: string | Observable<string>;
  value: T;
}

/**
 * Control types
 */
export type ControlType =
  | "hidden"
  | "textbox"
  | "file"
  | "dropdown"
  | "textarea"
  | "switch"
  | "checkbox"
  | "checkboxgroup"
  | "radiogroup"
  | "group"
  | "array";

export interface BaseInputOptions<T> {
  /**
   * Initial value of form control
   */
  value?: T;

  /**
   * Unique key that identify form control (Required)
   */
  key: string;

  /**
   * Form control label
   */
  label?: string | Observable<string>;

  /**
   * Indicates if input required (For browser based validation)
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
   * Input html tag type attribute
   */
  type?: string;

  /**
   * Custom comparing function for options and values.
   * Can be used in dropdown multicheckbox, radiogroup
   * @param a
   * @param b
   */
  compareWith?: (a: T, b: T) => boolean

  /**
   * Dropdown, checkboxgroup and radiogroup options
   * Must be an array of {label:string, value:any}
   */
  options?: DropdownOption<T>[] | Observable<DropdownOption<T>[]>;

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
   * Orientation for checkbox and radio groups
   */
  orientation?: "horizontal" | "vertical";

  /**
   * Enable or disable multi selection on dropdown
   */
  multiple?: boolean;

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
   * Form control helper text
   * It will show under or top of input according to styles
   */
  helperText?: string | Observable<string>;

  /**
   * Enable floating style input (Bootstrap)
   */
  floating?: boolean;

  /**
   * ID of input
   * If you leave this empty it will be assigned automatically
   */
  id?: string;

  /**
   * Input placeholder
   */
  placeholder?: string | Observable<string>;

  /**
   * Disable initially
   */
  disabled?: boolean;

  /**
   * Readonly
   */
  readonly?: boolean;
}

export interface ArrayInputOptions<T> extends BaseInputOptions<T[]> {
  input: AnyInput;
}

export interface GroupInputOptions<T> extends BaseInputOptions<T> {
  inputs: AnyInput[];
}

export class BaseInput<T> implements BaseInputOptions<T> {
  value: BaseInputOptions<T>["value"];
  key: BaseInputOptions<T>["key"];
  label: BaseInputOptions<T>["label"];
  required: BaseInputOptions<T>["required"];
  order: BaseInputOptions<T>["order"];
  controlType: BaseInputOptions<T>["controlType"];
  type: BaseInputOptions<T>["type"]; // for input.type, text | email | number | password
  options: BaseInputOptions<T>["options"];
  validators: BaseInputOptions<T>["validators"];
  validatorsMessage: BaseInputOptions<T>["validatorsMessage"];
  multiple: BaseInputOptions<T>["multiple"]; // For multiselect
  orientation: BaseInputOptions<T>["orientation"];
  floating: boolean;
  size: string;
  inputSize: BaseInputOptions<T>["inputSize"];
  helperText: BaseInputOptions<T>["helperText"];
  id: string;
  placeholder: BaseInputOptions<T>["placeholder"];

  compareWith?: BaseInputOptions<T>["compareWith"];

  input?: AnyInput;
  inputs?: AnyInput[];

  disabled?: boolean;
  readonly ?: boolean;

  constructor(options: BaseInputOptions<T>) {
    this.value = options.value;
    this.key = options.key ?? "";
    this.label = options.label ?? "";
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType ?? "textbox";
    this.type = options.type ?? "";
    this.options = options.options ?? [];
    this.validators = options.validators ?? [];
    this.validatorsMessage = options.validatorsMessage ?? [];
    this.orientation = options.orientation ?? "horizontal";
    this.multiple = options.multiple ?? false;
    this.size = options.size ?? "12";
    this.inputSize = options.inputSize ?? "";
    this.helperText = options.helperText ?? "";
    this.floating = options.floating ?? false;
    this.id = options.id ?? options.key + "_" + randomString(10);
    this.placeholder = this.floating ? this.label : options.placeholder ?? "";

    // Set default comparing function if not provided
    this.compareWith = options.compareWith ?? ((a: any, b: any) => a === b);

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

/**
 * Text box input (html basic input tag)
 * Can be altered with type option
 */
export class TextBoxInput<T> extends BaseInput<T> {
  override controlType: ControlType = "textbox";
}

/**
 * File input (don't recommended now)
 */
export class FileInput extends BaseInput<any> {
  override controlType: ControlType = "file";
}

/**
 * Select box
 */
export class DropdownInput<T> extends BaseInput<T> {
  override controlType: ControlType = "dropdown";

  showClearButton: boolean = true;
  clearButtonText = 'Clear';
}

/**
 * Textarea
 */
export class TextAreaInput<T> extends BaseInput<T> {
  override controlType: ControlType = "textarea";
}

/**
 * Bootstrap switch input
 */
export class SwitchInput<T> extends BaseInput<boolean> {
  override controlType: ControlType = "switch";
  color: string = "primary";
}

/**
 * Single checkbox
 */
export class CheckboxInput<T> extends BaseInput<T> {
  override controlType: ControlType = "checkbox";
}

/**
 * Multi checkbox
 */
export class CheckboxGroupInput<T> extends BaseInput<T[]> {
  override controlType: ControlType = "checkboxgroup";

  constructor(props: BaseInputOptions<T[]>) {
    super(props);

    this.value = props.value ?? [];
  }

}

/**
 * Radio group
 */
export class RadioGroupInput<T> extends BaseInput<T> {
  override controlType: ControlType = "radiogroup";
}

/**
 * Hidden Input type
 * can be used for external controlled form fields like file upload or just keep value
 */
export class HiddenInput<T> extends BaseInput<T> {
  override controlType: ControlType = "hidden";
}

/**
 * Array input
 * !!! Not production ready
 */
export class ArrayInput<T> implements ArrayInputOptions<T> {
  controlType: ControlType = "array";

  value?: Array<T> | undefined;
  key: string;
  validators?: ValidatorFn[] | undefined;
  validatorsMessage?: BaseInputOptions<T>["validatorsMessage"];
  size?: string | undefined;
  helperText?: BaseInputOptions<T>["helperText"];

  input!: AnyInput;

  constructor(options: ArrayInputOptions<T>) {
    this.value = options.value ?? [];
    this.key = options.key ?? "";
    this.validators = options.validators ?? [];
    this.validatorsMessage = options.validatorsMessage ?? [];
    this.size = options.size ?? "";
    this.helperText = options.helperText ?? "";

    this.input = options.input ?? [];
  }

  createFormControl() {
    const val = this.value as Array<T>;

    const controls: any[] = val.map((v) => {
      const control = this.input.createFormControl();
      control.patchValue(v);
      return control;
    });

    return new FormArray(controls, this.validators);
  }
}

/**
 * Form group
 * !!! Not production ready
 */
export class GroupInput<T> extends BaseInput<T> {
  override controlType: ControlType = "group";

  override inputs!: AnyInput[];

  constructor(options: GroupInputOptions<T>) {
    super(options);

    this.inputs = options.inputs ?? [];
  }

  override createFormControl() {
    const group: any = {};

    this.inputs.forEach((inputData) => {
      if (!inputData.key) return;
      group[inputData.key] = inputData.createFormControl();
    });

    const fg = new FormGroup(group, this.validators);

    if (this.value) {
      fg.patchValue(this.value);
    }

    return fg;
  }
}

/**
 * Inputs type wrapper
 */
export type AnyInput =
  | BaseInput<any>
  | TextBoxInput<any>
  | FileInput
  | DropdownInput<any>
  | TextAreaInput<any>
  | SwitchInput<any>
  | CheckboxInput<any>
  | CheckboxGroupInput<any>
  | RadioGroupInput<any>
  | GroupInput<any>
  | ArrayInput<any>;

/**
 * Create each form control from each input
 * @param inputs
 */
export function createFormGroup(inputs: AnyInput[]) {
  const group: any = {};

  inputs.forEach((inputData) => {
    if (!inputData.key) return;
    group[inputData.key] = inputData.createFormControl();
  });
  return new FormGroup(group);
}
