import {Observable} from "rxjs";
import {ControlType} from "../interfaces/control-type";
import {BaseInput} from "./base-input";
import {DropdownOption} from "../interfaces/dropdown-option.interface";
import {CheckboxGroupInputInterface} from "../interfaces/checkbox-group-input.interface";

/**
 * Multi checkbox
 */
export class CheckboxGroupInput<T> extends BaseInput<T> {
  override controlType: ControlType = "checkboxgroup";

  inputType?: 'checkbox' | 'radio'; // Default: checkbox

  /**
   * Dropdown, checkboxgroup and radiogroup options
   * Must be an array of {label:string, value:any}
   */
  options?: DropdownOption<T>[] | Observable<DropdownOption<T>[]> = [];

  /**
   * Orientation for checkbox and radio groups
   */
  orientation?: "horizontal" | "vertical";

  /**
   * Custom comparing function for options and values.
   * Can be used in dropdown multicheckbox, radiogroup
   * @param a
   * @param b
   */
  compareWith?: (a: T, b: T) => boolean = ((a: any, b: any) => a === b);

  constructor(config: CheckboxGroupInputInterface<T>) {
    super(config);

    this.options = config.options ?? this.options;
    this.orientation = config.orientation ?? this.orientation;
    this.compareWith = config.compareWith ?? this.compareWith;
  }

}
