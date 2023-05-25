import {Observable} from "rxjs";
import {ControlType} from "../interfaces/control-type";
import {BaseInput} from "./base-input";
import {BaseInputInterface} from "../interfaces/base-input.interface";
import {PlaceholderInterface} from "../interfaces/placeholder.interface";
import {FloatingInterface} from "../interfaces/floating.interface";

/**
 * Text box input (html basic input tag)
 * Can be altered with type option
 */
export class TextBoxInput<T> extends BaseInput<T> {
  override controlType: ControlType = "textbox";

  /**
   * Input html tag type attribute
   */
  inputType: string = 'text'; // for input.type, text | email | number | password

  /**
   * Enable floating style input (Bootstrap)
   */
  floating?: boolean;

  /**
   * Input placeholder
   */
  placeholder?: string | Observable<string>;

  /**
   * Simple input mask
   * example: AAAA-1111-AAA
   * Input mask will only change letters and numbers
   * To keep letter case use `x` symbol as letter otherwise it will change its case even if you type lower case
   * lowercase example: aaaa-1111-aaa
   * uppercase example: AAAA-1111-AAA
   * case insensitive example: xxxx-1111-xxx
   *
   * Mask input will work as insert mode
   */
  mask?: string;

  constructor(options: BaseInputInterface<T> & PlaceholderInterface & FloatingInterface & { type?: string }) {
    super(options);

    if (options.floating) this.floating = options.floating;
    if (options.placeholder) this.placeholder = options.placeholder;
    if (options.type) this.inputType = options.type;
  }
}
