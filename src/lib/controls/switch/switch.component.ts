import {Component, Input} from "@angular/core";
import {ControlValueAccessor, FormsModule, NgControl} from "@angular/forms";
import {DynamicControlInterface} from "../../interfaces/dynamic-control.interface";
import {CommonModule} from "@angular/common";
import {ObservableStringPipe} from "../../pipes/observable-string.pipe";
import {BaseInput} from "../../common/base-input";

@Component({
  selector: "ngy-switch",
  standalone: true,
  templateUrl: "./switch.component.html",
  styleUrls: ["./switch.component.scss"],
  imports: [
    CommonModule,
    FormsModule,
    ObservableStringPipe
  ]
})
export class SwitchComponent implements ControlValueAccessor, DynamicControlInterface {
  @Input() formName: string = "";
  @Input() input!: BaseInput<any>;
  @Input() disabled: boolean = false;

  val: any;

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

  valChanged(val: boolean) {
    this.val = val;
    this.onChange(this.val);
  }

  labelClick() {
    if (this.disabled) return;
    this.val = !this.val;
    this.onChange(this.val);
  }
}
