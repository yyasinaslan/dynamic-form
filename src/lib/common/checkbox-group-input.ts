import {BaseInput} from "dynamic-form/common/base-input";
import {ControlType} from "dynamic-form/interfaces/control-type";
import {DropdownOption} from "dynamic-form/interfaces/dropdown-option.interface";
import {Observable} from "rxjs";

/**
 * Multi checkbox
 */
export class CheckboxGroupInput<T> extends BaseInput<T[]> {
  override controlType: ControlType = "checkboxgroup";

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

}
