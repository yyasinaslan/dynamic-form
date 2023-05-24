import {DropdownInput} from "../common/dropdown-input";
import {BaseInput} from "../common/base-input";
import {TextBoxInput} from "../common/textbox-input";
import {FileInput} from "../common/file-input";
import {TextAreaInput} from "../common/textarea-input";
import {SwitchInput} from "../common/switch-input";
import {CheckboxInput} from "../common/checkbox-input";
import {CheckboxGroupInput} from "../common/checkbox-group-input";
import {RadioGroupInput} from "../common/radio-group-input";
import {GroupInput} from "../common/group-input";
import {ArrayInput} from "../common/array-input";


/**
 * Inputs type union
 */
export type AnyInput = BaseInput<any>
  | TextBoxInput<any>
  | FileInput
  | DropdownInput<any>
  | TextAreaInput<any>
  | SwitchInput<any>
  | CheckboxInput<any>
  | CheckboxGroupInput<any>
  | RadioGroupInput<any>
  // & GroupInput<any>
  // & ArrayInput<any>;

