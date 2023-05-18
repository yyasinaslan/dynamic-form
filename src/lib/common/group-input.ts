import {FormGroup} from "@angular/forms";
import {ControlType} from "../interfaces/control-type";
import {BaseInput} from "./base-input";
import {AnyInput} from "../interfaces/any-input.interface";

/**
 * Form group
 * !!! Not production ready
 */
export class GroupInput<T> extends BaseInput<T> {
  override controlType: ControlType = "group";

  inputs!: AnyInput[];

  constructor(options: GroupInput<T>) {
    super(options);

    this.inputs = options.inputs ?? [];
  }

  override createFormControl() {
    const group: any = {};

    this.inputs.forEach((inputData) => {
      if (!inputData.key) return;
      group[inputData.key] = inputData.createFormControl();
    });

    const fg = new FormGroup(group, this.validators);

    if (this.value) {
      fg.patchValue(this.value);
    }

    return fg;
  }
}
