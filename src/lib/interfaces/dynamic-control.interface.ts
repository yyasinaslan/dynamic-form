import {BaseInput} from "../common/base-input";


export interface DynamicControlInterface {
  /**
   * A dynamic control must have a BaseInput reference
   */
  input: BaseInput<any>;

  /**
   * disabled State
   */
  disabled: boolean;

  /**
   * For creating unique IDs
   */
  formName: string;
}
