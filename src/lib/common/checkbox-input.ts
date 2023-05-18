import {BaseInput} from "./base-input";
import {ControlType} from "../interfaces/control-type";


/**
 * Single checkbox
 */
export class CheckboxInput<T> extends BaseInput<T> {
  override controlType: ControlType = "checkbox";
}
