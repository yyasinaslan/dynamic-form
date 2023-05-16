import {TextBoxInput} from "dynamic-form/common/textbox-input";
import {BaseInput} from "dynamic-form/common/base-input";
import {FileInput} from "dynamic-form/common/file-input";
import {DropdownInput} from "dynamic-form/common/dropdown-input";
import {TextAreaInput} from "dynamic-form/common/textarea-input";
import {SwitchInput} from "dynamic-form/common/switch-input";
import {CheckboxInput} from "dynamic-form/common/checkbox-input";
import {CheckboxGroupInput} from "dynamic-form/common/checkbox-group-input";
import {RadioGroupInput} from "dynamic-form/common/radio-group-input";
import {GroupInput} from "dynamic-form/common/group-input";
import {ArrayInput} from "dynamic-form/common/array-input";

/**
 * Inputs type wrapper
 */
export type AnyInput =
  | BaseInput<any>
  | TextBoxInput<any>
  | FileInput
  | DropdownInput<any>
  | TextAreaInput<any>
  | SwitchInput<any>
  | CheckboxInput<any>
  | CheckboxGroupInput<any>
  | RadioGroupInput<any>
  | GroupInput<any>
  | ArrayInput<any>;

