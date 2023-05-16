import {BaseInput} from "dynamic-form/common/base-input";
import {FormGroup} from "@angular/forms";
import {GroupInputOptions} from "dynamic-form/interfaces/group-input.interface";
import {AnyInput} from "dynamic-form/interfaces/any-input.interface";
import {ControlType} from "dynamic-form/interfaces/control-type";

/**
 * Form group
 * !!! Not production ready
 */
export class GroupInput<T> extends BaseInput<T> {
  override controlType: ControlType = "group";

  override inputs!: AnyInput[];

  constructor(options: GroupInputOptions<T>) {
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
