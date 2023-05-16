import {BaseInput} from "dynamic-form/common/base-input";
import {ControlType} from "dynamic-form/interfaces/control-type";
import {DropdownOption} from "dynamic-form/interfaces/dropdown-option.interface";
import {Observable} from "rxjs";

/**
 * Radio group
 */
export class RadioGroupInput<T> extends BaseInput<T> {
  override controlType: ControlType = "radiogroup";

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
