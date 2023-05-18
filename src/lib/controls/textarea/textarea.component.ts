import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ControlValueAccessor, NgControl} from "@angular/forms";
import {ObservableStringPipe} from "../../pipes/observable-string.pipe";
import {DynamicControlInterface} from "../../interfaces/dynamic-control.interface";
import {TextAreaInput} from "../../common/textarea-input";

@Component({
  selector: 'ngy-textarea',
  standalone: true,
  imports: [CommonModule, ObservableStringPipe],
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent implements ControlValueAccessor, DynamicControlInterface {
  @Input() formName: string = "";
  @Input() input!: TextAreaInput<any>;
  @Input() disabled: boolean = false;

  @Input() floating: boolean = false;

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
    this.val = target.value;
    this.onChange(this.val);
  }
}
