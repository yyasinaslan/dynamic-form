import {NgControl} from "@angular/forms";

export interface ChangeEventInterface<T = any> {
  target: any,
  originalEvent: any,
  value: T,
  type: string,
  control?: NgControl
}
