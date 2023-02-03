import {Component, Input} from '@angular/core';
import {ControlValueAccessor, NgControl} from "@angular/forms";
import {DynamicControlInterface} from "../../helpers/dynamic-control.interface";
import {TextAreaInput, TextBoxInput} from "../../helpers/dynamic-form.interface";

@Component({
  selector: 'ngy-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.css']
})
export class FileInputComponent implements ControlValueAccessor, DynamicControlInterface {
  @Input() formName: string = "";
  @Input() input!: TextBoxInput<string> | TextAreaInput<any>;
  @Input() disabled: boolean = false;

  val: any;

  constructor(public control: NgControl) {
    this.control.valueAccessor = this;
  }

  onChange: (value: any) => void = () => {
  };

  onTouched: () => void = () => {
  };

  ngOnInit(): void {
  }

  public registerOnChange(fn: (value: any | null) => void) {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  writeValue(obj: any) {
    this.val = obj;
  }

  valueChange($event: Event) {
    const target = $event.target as HTMLInputElement;
    if (!target) return;
    this.val = target.files;
    this.onChange(this.val);
  }
}
