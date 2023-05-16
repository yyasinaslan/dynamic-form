import {BaseInput} from "dynamic-form/common/base-input";
import {ControlType} from "dynamic-form/interfaces/control-type";
import {Observable} from "rxjs";

/**
 * File input (don't recommended now)
 */
export class FileInput extends BaseInput<any> {
  override controlType: ControlType = "file";

  /**
   * Input placeholder
   */
  placeholder?: string | Observable<string>;
}
