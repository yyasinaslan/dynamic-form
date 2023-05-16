import {BaseInput} from "dynamic-form/common/base-input";
import {ControlType} from "dynamic-form/interfaces/control-type";
import {DropdownOption} from "dynamic-form/interfaces/dropdown-option.interface";
import {Observable} from "rxjs";

/**
 * Select box
 */
export class DropdownInput<T> extends BaseInput<T> {
  override controlType: ControlType = "dropdown";

  /**
   * Dropdown, checkboxgroup and radiogroup options
   * Must be an array of {label:string, value:any}
   */
  options?: DropdownOption<T>[] | Observable<DropdownOption<T>[]> = [];

  /**
   * Enable or disable multi selection on dropdown
   */
  multiple?: boolean;

  /**
   * Enable floating style input (Bootstrap)
   */
  floating?: boolean;

  /**
   * Input placeholder
   */
  placeholder?: string | Observable<string>;

  showClearButton: boolean = true;
  clearButtonText = 'Clear';

  /**
   * Custom comparing function for options and values.
   * Can be used in dropdown multicheckbox, radiogroup
   * @param a
   * @param b
   */
  compareWith?: (a: T, b: T) => boolean = ((a: any, b: any) => a === b);
}
