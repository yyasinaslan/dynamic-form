import {Component, Input, Optional} from '@angular/core';
import {ControlValueAccessor, NgControl} from "@angular/forms";
import {DynamicControlInterface} from "../../interfaces/dynamic-control.interface";
import {CommonModule} from "@angular/common";
import {ObservableStringPipe} from "../../pipes/observable-string.pipe";
import {TextBoxInput} from "../../common/textbox-input";
import {TextAreaInput} from "../../common/textarea-input";

@Component({
  selector: 'ngy-file-input',
  standalone: true,
  templateUrl: './file-input.component.html',
  imports: [
    CommonModule,
    ObservableStringPipe
  ],
  styleUrls: ['./file-input.component.scss']
})
export class FileInputComponent implements ControlValueAccessor, DynamicControlInterface {
  @Input() formName: string = "";
  @Input() input!: TextBoxInput<string> | TextAreaInput<any>;
  @Input() disabled: boolean = false;

  val: any;

  constructor(@Optional() public control?: NgControl) {
    if (control)
      control.valueAccessor = this;
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
