import {Component, Input} from "@angular/core";
import {NgControl} from "@angular/forms";
import {DynamicControlInterface} from "../../helpers/dynamic-control.interface";
import {CheckboxInput} from "../../helpers/dynamic-form.interface";

@Component({
  selector: "ngy-checkbox",
  templateUrl: "./checkbox.component.html",
  styleUrls: ["./checkbox.component.scss"],
})
export class CheckboxComponent implements DynamicControlInterface {
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
    this.val = !this.val;
    this.onChange(this.val);
  }
}
