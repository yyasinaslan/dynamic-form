import {FormGroup} from "@angular/forms";
import {AnyInput} from "../interfaces/any-input.interface";

/**
 * Create each form control from each input
 * @param inputs
 */
export function createFormGroup(inputs: AnyInput[]) {
  const group: any = {};

  inputs.forEach((inputData) => {
    if (!inputData.key) return;
    group[inputData.key] = inputData.createFormControl();
  });
  return new FormGroup(group);
}
