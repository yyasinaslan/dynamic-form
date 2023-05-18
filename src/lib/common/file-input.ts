import {Observable} from "rxjs";
import {ControlType} from "../interfaces/control-type";
import {BaseInput} from "./base-input";
import {BaseInputInterface} from "../interfaces/base-input.interface";
import {PlaceholderInterface} from "../interfaces/placeholder.interface";

/**
 * File input (don't recommended now)
 */
export class FileInput extends BaseInput<any> {
  override controlType: ControlType = "file";

  /**
   * Input placeholder
   */
  placeholder?: string | Observable<string>;

  constructor(options: BaseInputInterface<any> & PlaceholderInterface) {
    super(options);
  }

}
