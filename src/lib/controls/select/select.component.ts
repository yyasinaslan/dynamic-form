import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  SimpleChanges
} from "@angular/core";
import {ControlValueAccessor, NgControl} from "@angular/forms"
import {DynamicControlInterface} from "../../interfaces/dynamic-control.interface";
import {BehaviorSubject, combineLatest, map, Observable, of, Subscription} from "rxjs";
import {CommonModule} from "@angular/common";
import {DropdownInput} from "../../common/dropdown-input";
import {ObservableStringPipe} from "../../pipes/observable-string.pipe";
import {DropdownOption} from "../../interfaces/dropdown-option.interface";

@Component({
  selector: "ngy-select",
  standalone: true,
  templateUrl: "./select.component.html",
  styleUrls: ["./select.component.scss"],
  imports: [
    ObservableStringPipe,
    CommonModule,
  ]
})
export class SelectComponent implements OnInit, OnDestroy, OnChanges, ControlValueAccessor, DynamicControlInterface {
  @Input() formName: string = "";
  @Input() input!: DropdownInput<any>;
  @Input() disabled: boolean = false;

  @Input() floating: boolean = false;
  _options: DropdownOption[] = [];
  showDropdown: boolean = false;
  val: string[] | string = []; //seçili olan değer (checked)
  labels$: string | Observable<string> = new BehaviorSubject<string>('');
  optionLabelsSub?: Subscription;
  private optionSub?: Subscription;

  constructor(public control: NgControl, private elRef: ElementRef) {
    control.valueAccessor = this;
  }

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

  onChange: (value: any) => void = () => {
  };

  onTouched: () => void = () => {
  };

  async calcLabels() {
    const labels = await this.labels();

    this.labels$ = labels;
  }

  labels() {
    if (!Array.isArray(this.val)) {
      if (!this._options) return this.val;

      const opt = this._options.find((o) => this.compareWith(o.value, this.val));

      if (!opt) return this.val;

      return opt.label;
    }

    if (this.val === undefined) return "";

    if (!this._options || this._options.length == 0) return this.val.join(', ')

    const labels: Array<string | Observable<string>> = this.val.filter(v => {
      return this._options.find((o) => this.compareWith(o.value, v));
    }).map((v) => {
      const opt = this._options.find((o) => this.compareWith(o.value, v));
      if (!opt) return v;

      return opt.label;
    });

    if (labels.some(l => l instanceof Observable)) {
      return combineLatest(labels.map(l => l instanceof Observable ? l : of(l)))
        .pipe(
          map(labelsString => labelsString.join(', '))
        );
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


    if (this.valIncludes(this.val, checkValue) && !checked) {
      const selected = this.val.filter(v => v != checkValue)
      this.val = this._options
        .filter(opt => this.valIncludes(selected, opt.value))
        .map(opt => opt.value);
    } else if (!this.valIncludes(this.val, checkValue) && checked) {
      this.val = this._options
        .filter(opt => this.valIncludes([...this.val, checkValue], opt.value))
        .map(opt => opt.value);
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
    this.calcLabels();
  }

  toggleDropdown() {
    if (this.control.disabled) {
      return;
    }
    this.showDropdown = !this.showDropdown;
  }

  /**
   * Returns true if selected array has value in it
   * @param arr
   * @param value
   */
  valIncludes(arr: Array<any>, value: any) {
    if (!Array.isArray(arr)) return false;
    return arr.findIndex(v => this.compareWith(v, value)) > -1;
  }

  ngOnDestroy(): void {
    this.desubOptions();
  }

  ngOnInit(): void {
    this.subOptions();
    this.calcLabels();
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['input']) {
      this.desubOptions();
      this.subOptions();
    }
  }

  subOptions() {
    if (this.input.options instanceof Observable) {
      this.optionSub = this.input.options.subscribe((options) => {
        this._options = options;
        this.calcLabels();
      });
      return;
    }

    this._options = this.input.options as DropdownOption[];
  }

  desubOptions() {
    if (this.input.options instanceof Observable && this.optionSub) {
      this.optionSub.unsubscribe();
    }
  }
}
