import {Observable} from "rxjs";
import {BaseInput} from "./base-input";
import {ControlType} from "../interfaces/control-type";
import {BaseInputInterface} from "../interfaces/base-input.interface";
import {PlaceholderInterface} from "../interfaces/placeholder.interface";
import {FloatingInterface} from "../interfaces/floating.interface";

/**
 * Textarea
 */
export class TextAreaInput<T> extends BaseInput<T> {
  override controlType: ControlType = "textarea";

  /**
   * Enable floating style input (Bootstrap)
   */
  floating?: boolean;

  /**
   * Input placeholder
   */
  placeholder?: string | Observable<string>;

  constructor(options: BaseInputInterface<T> & PlaceholderInterface & FloatingInterface) {
    super(options);

    if (options.floating) this.floating = options.floating;
    if (options.placeholder) this.placeholder = options.placeholder;
  }
}
