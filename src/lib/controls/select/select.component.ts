import {Component, ElementRef, HostListener, Input, OnInit, Optional} from "@angular/core";
import {ControlValueAccessor, NgControl} from "@angular/forms"
import {DynamicControlInterface} from "../../helpers/dynamic-control.interface";
import {DropdownInput, DropdownOption} from "../../helpers/dynamic-form.interface";
import {BehaviorSubject, combineLatest, map, Observable, of, Subscription} from "rxjs";

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

  @Optional() @Input() compareWith: (a: any, b: any) => boolean = (a: any, b: any) => {
    return a === b;
  };

  @HostListener('document:click', ['$event'])
  documentClick(event: MouseEvent) {
    const nativeEl = this.elRef.nativeElement as HTMLElement;
    if (!nativeEl.contains(event.target as HTMLElement)) {
      this.showDropdown = false;
    }
  }

  showDropdown: boolean = false;

  val: string[] | string = []; //seçili olan değer (checked)

  labels$: string | Observable<string> = new BehaviorSubject<string>('');

  optionLabelsSub?: Subscription;

  onChange: (value: any) => void = () => {
  };

  onTouched: () => void = () => {
  };


  constructor(public control: NgControl, private elRef: ElementRef) {
    control.valueAccessor = this;
  }

  ngOnInit(): void {
    this.calcLabels();
  }

  async calcLabels() {
    const labels = await this.labels();

    this.labels$ = labels;
  }

  labels() {
    if (!Array.isArray(this.val)) {
      if (!this.input.options) return this.val;

      const opt = this.input.options.find((o) => this.compareWith(o.value, this.val));

      if (!opt) return this.val;

      return opt.label;
    }

    if (this.val === undefined) return "";

    const labels: Array<string | Observable<string>> = this.val.map((v) => {
      if (!this.input.options) return v;

      const opt = this.input.options.find((o) => this.compareWith(o.value, v));

      if (!opt) return v;

      return opt.label;
    });

    if (labels.some(l => typeof l !== 'string')) {
      return combineLatest(labels.map(l => typeof l === 'string' ? of(l) : l)).pipe(map(labelsString => labelsString.join(', ')));
    }

    return labels.join(", ");
  }

  clickedControl(value: any, label: any) {
    this.val = value;
    this.onChange(this.val);
    this.showDropdown = false;
    this.calcLabels();
  }

  changeCheckControl(event: any, option: DropdownOption) {
    if (!this.input.multiple) return;

    if (!Array.isArray(this.val)) this.val = [this.val];

    const checked = event.target.checked;
    const checkValue = option.value;

    if (this.valIncludes(checkValue) && !checked) {
      (this.val as Array<any>).splice(this.val.indexOf(checkValue), 1);
    } else if (!this.valIncludes(checkValue) && checked) {
      this.val = [...this.val, checkValue];
    }

    this.onChange(this.val);
    this.calcLabels();
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

  toggleDropdown() {
    if (this.control.disabled) {
      return;
    }
    this.showDropdown = !this.showDropdown;
  }

  /**
   * Returns true if selected array has value in it
   * @param value
   */
  valIncludes(value: any) {
    if (!Array.isArray(this.val)) return false;
    return (this.val as Array<any>).findIndex(v => this.compareWith(v, value)) > -1;
  }
}
