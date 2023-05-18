import {BaseInput} from "./base-input";
import {ControlType} from "../interfaces/control-type";


/**
 * Hidden Input type
 * can be used for external controlled form fields like file upload or just keep value
 */
export class HiddenInput<T> extends BaseInput<T> {
  override controlType: ControlType = "hidden";
}
