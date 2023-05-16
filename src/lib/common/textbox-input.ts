import {BaseInput} from "dynamic-form/common/base-input";
import {ControlType} from "dynamic-form/interfaces/control-type";
import {Observable} from "rxjs";

/**
 * Text box input (html basic input tag)
 * Can be altered with type option
 */
export class TextBoxInput<T> extends BaseInput<T> {
  override controlType: ControlType = "textbox";

  /**
   * Input html tag type attribute
   */
  type: string = 'text'; // for input.type, text | email | number | password

  /**
   * Enable floating style input (Bootstrap)
   */
  floating?: boolean;

  /**
   * Input placeholder
   */
  placeholder?: string | Observable<string>;
}
