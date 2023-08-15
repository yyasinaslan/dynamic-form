import {Observable} from "rxjs";

export interface Action {
  label: string | Observable<string>;
  position: 'end' | 'start';
  buttonClass?: string;
  beforeTemplate?: string; // Static html template that will be putted before label
  afterTemplate?: string; // Static html template that will be putted after label
  click: (event: MouseEvent) => void
}
