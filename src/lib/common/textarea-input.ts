import {BaseInput} from "dynamic-form/common/base-input";
import {ControlType} from "dynamic-form/interfaces/control-type";
import {Observable} from "rxjs";

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
}
