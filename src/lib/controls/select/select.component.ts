import {Component, Input, OnInit} from "@angular/core";
import {ControlValueAccessor, NgControl} from "@angular/forms"
import {DynamicControlInterface} from "../../helpers/dynamic-control.interface";
import {DropdownInput} from "../../helpers/dynamic-form.interface";

@Component({
  selector: "ngy-select",
  templateUrl: "./select.component.html",
  styleUrls: ["./select.component.scss"],
})
export class SelectComponent implements OnInit, ControlValueAccessor, DynamicControlInterface {
  @Input() formName: string = "";
  @Input() input!: DropdownInput<any>;
  @Input() disabled: boolean = false;

  @Input() floating: boolean = false;

  val: string[] | string = []; //seçili olan değer (checked)
  onChange: (value: any) => void = () => {
  };
  onTouched: () => void = () => {
  };

  constructor(public control: NgControl) {
    control.valueAccessor = this;
  }

  ngOnInit(): void {
    this.labels;
  }

  get labels(): string | any {
    if (typeof this.val == "string") {
      if (!this.input.options) return this.val;

      const opt = this.input.options.find((o) => o.value == this.val);

      if (!opt) return this.val;

      return opt.label;
    }

    if (!this.val) return "";

    const labels = this.val.map((v) => {
      if (!this.input.options) return v;

      const opt = this.input.options.find((o) => o.value == v);

      if (!opt) return v;

      return opt.label;
    });

    return labels.join(", ");
  }

  clickedControl(value: any, label: any) {
    this.val = value;
    this.onChange(this.val);
  }

  changeCheckControl(event: any, option: any) {
    if (!this.input.multiple) return;

    const checked = event.target.checked;
    const checkValue = event.target.value;

    if (this.val.includes(checkValue) && !checked) {
      (this.val as Array<any>).splice(this.val.indexOf(checkValue), 1);
    } else if (!this.val.includes(checkValue) && checked) {
      this.val = [...this.val, checkValue];
    }

    this.onChange(this.val);
  }

  public registerOnChange(fn: (value: any | null) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(obj: any): void {
    this.val = obj;
  }
}
