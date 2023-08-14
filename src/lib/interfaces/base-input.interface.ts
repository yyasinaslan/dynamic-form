import {Observable} from "rxjs";
import {ValidatorFn} from "@angular/forms";
import {ControlType} from "./control-type";
import {ChangeEventInterface} from "./change-event.interface";
import {Action} from "./action";

export interface BaseInputInterface<T> {
  // Configurations
  key: string;
  value?: T;
  label?: string | Observable<string>;
  required?: boolean;
  order?: number;
  controlType?: ControlType;
  validators?: ValidatorFn[];
  validatorsMessage?: { key: string; message: string | Observable<string> }[];
  size?: string | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';
  inputSize?: "" | "sm" | "lg";
  id?: string;
  disabled?: boolean;
  readonly?: boolean;
  helperText?: string | Observable<string>;

  // Event handlers
  change?: (event: ChangeEventInterface) => void
  focus?: (event: FocusEvent) => void
  blur?: (event: FocusEvent) => void
  click?: (event: MouseEvent) => void
  contextMenu?: (event: MouseEvent) => void

  actions?: Array<Action> // (Only applies to  box type inputs like TextBox, Dropdown, Combobox except TextArea)
}
