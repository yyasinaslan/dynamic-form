import {Observable} from "rxjs";

/**
 * Dropdown option type
 *
 * Label of dropdown can be observable thanks to observableString pipe
 */
export interface DropdownOption<T = any> {
  label: string | Observable<string>;
  value: T;
}
