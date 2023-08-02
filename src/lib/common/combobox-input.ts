import {Observable} from "rxjs";
import {ControlType} from "../interfaces/control-type";
import {BaseInput} from "./base-input";
import {DropdownOption} from "../interfaces/dropdown-option.interface";
import {ComboboxInputInterface, ComboboxSearchType} from "../interfaces/combobox-input.interface";


/**
 * Select box
 */
export class ComboboxInput<T> extends BaseInput<T> {
  override controlType: ControlType = "combobox";

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

  showClearButton: boolean = false;
  clearButtonText = 'Clear';

  search?: (event: string) => void;
  searchType?: ComboboxSearchType = 'client';

  /**
   * Custom comparing function for options and values.
   * Can be used in dropdown multicheckbox, radiogroup
   * @param a
   * @param b
   */
  compareWith?: (a: T, b: T) => boolean = ((a: any, b: any) => a === b);

  constructor(config: ComboboxInputInterface<T>) {
    super(config);

    this.options = config.options ?? this.options;
    this.multiple = config.multiple ?? this.multiple;
    this.floating = config.floating ?? this.floating;
    this.placeholder = config.placeholder ?? this.placeholder;
    this.showClearButton = config.showClearButton ?? this.showClearButton;
    this.clearButtonText = config.clearButtonText ?? this.clearButtonText;
    this.compareWith = config.compareWith ?? this.compareWith;

    this.searchType = config.searchType;
    this.search = config.search;


  }
}
