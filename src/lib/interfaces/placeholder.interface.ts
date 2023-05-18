import {Observable} from "rxjs";

export interface PlaceholderInterface {
  placeholder?: string | Observable<string>;
}
