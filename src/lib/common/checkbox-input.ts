import {BaseInput} from "dynamic-form/common/base-input";
import {ControlType} from "dynamic-form/interfaces/control-type";


/**
 * Single checkbox
 */
export class CheckboxInput<T> extends BaseInput<T> {
  override controlType: ControlType = "checkbox";
}
