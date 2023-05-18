import {Component, Input} from "@angular/core";
import {ControlValueAccessor, NgControl} from "@angular/forms";
import {DynamicControlInterface} from "../../interfaces/dynamic-control.interface";
import {CommonModule} from "@angular/common";
import {ObservableStringPipe} from "../../pipes/observable-string.pipe";
import {CheckboxInput} from "../../common/checkbox-input";

@Component({
  selector: "ngy-checkbox",
  standalone: true,
  templateUrl: "./checkbox.component.html",
  styleUrls: ["./checkbox.component.scss"],
  imports: [
    CommonModule,
    ObservableStringPipe
  ]
})
export class CheckboxComponent implements ControlValueAccessor, DynamicControlInterface {
  @Input() formName: string = "";
  @Input() input!: CheckboxInput<any>;
  @Input() disabled: boolean = false;

  val: boolean = false;

  constructor(public control: NgControl) {
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

  valChanged($event: Event) {
    const target = $event.target as HTMLInputElement;
    if (!target) return;

    this.val = target.checked;
    this.onChange(this.val);
  }

  labelClick() {
    if (this.disabled) return;
    this.val = !this.val;
    this.onChange(this.val);
  }
}
