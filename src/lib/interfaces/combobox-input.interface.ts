import {Observable} from "rxjs";
import {BaseInputInterface} from "./base-input.interface";
import {PlaceholderInterface} from "./placeholder.interface";
import {FloatingInterface} from "./floating.interface";
import {DropdownOption} from "./dropdown-option.interface";


export type ComboboxSearchType = 'client' | 'server';

export interface ComboboxInputInterface<T> extends BaseInputInterface<T>, PlaceholderInterface, FloatingInterface {
  options?: DropdownOption<T>[] | Observable<DropdownOption<T>[]>;
  multiple?: boolean;
  showClearButton?: boolean;
  clearButtonText?: string;
  compareWith?: (a: T, b: T) => boolean;
  search?: (event: string) => void;
  searchType?: ComboboxSearchType;
}
