import {Observable} from "rxjs";
import {BaseInputInterface} from "./base-input.interface";
import {DropdownOption} from "./dropdown-option.interface";

export interface CheckboxGroupInputInterface<T> extends BaseInputInterface<T> {
  options?: DropdownOption<T>[] | Observable<DropdownOption<T>[]>;
  orientation?: "horizontal" | "vertical";
  compareWith?: (a: T, b: T) => boolean;
}
