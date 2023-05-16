import {Component, Input} from "@angular/core";
import {ControlValueAccessor, NgControl} from "@angular/forms";
import {DynamicControlInterface} from "../../interfaces/dynamic-control.interface";
import {TextAreaInput} from "dynamic-form/common/textarea-input";
import {TextBoxInput} from "dynamic-form/common/textbox-input";
import {ObservableStringPipe} from "dynamic-form/pipes/observable-string.pipe";
import {CommonModule} from "@angular/common";

@Component({
  selector: "ngy-textbox",
  standalone: true,
  templateUrl: "./textbox.component.html",
  imports: [
    ObservableStringPipe,
    CommonModule,
  ],
  styleUrls: ["./textbox.component.scss"]
})
export class TextboxComponent implements ControlValueAccessor, DynamicControlInterface {
  @Input() formName: string = "";
  @Input() input!: TextBoxInput<string>;
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
