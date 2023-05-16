import {BaseInput} from "dynamic-form/common/base-input";
import {ControlType} from "dynamic-form/interfaces/control-type";

/**
 * Bootstrap switch input
 */
export class SwitchInput<T> extends BaseInput<boolean> {
  override controlType: ControlType = "switch";
  color: string = "primary";
}
