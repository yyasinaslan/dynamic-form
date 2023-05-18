import {ControlType} from "../interfaces/control-type";
import {BaseInput} from "./base-input";
import {BaseInputInterface} from "../interfaces/base-input.interface";

/**
 * Bootstrap switch input
 */
export class SwitchInput<T> extends BaseInput<boolean> {
  override controlType: ControlType = "switch";
  color?: string = "primary";

  constructor(options: BaseInputInterface<boolean> & { color?: string }) {
    super(options);

    if (options.color) this.color = options.color;
  }
}
