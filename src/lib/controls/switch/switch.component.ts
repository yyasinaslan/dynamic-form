import {Component, Input} from "@angular/core";
import {ControlValueAccessor, NgControl} from "@angular/forms";
import {DynamicControlInterface} from "../../helpers/dynamic-control.interface";
import {BaseInput} from "../../helpers/dynamic-form.interface";

@Component({
  selector: "ngy-switch",
  templateUrl: "./switch.component.html",
  styleUrls: ["./switch.component.scss"],
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
