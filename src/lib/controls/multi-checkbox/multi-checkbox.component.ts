import {
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  QueryList,
  SimpleChanges
} from "@angular/core";
import {ControlValueAccessor, NgControl} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import {CommonModule} from "@angular/common";
import {ObservableStringPipe} from "../../pipes/observable-string.pipe";
import {DropdownOption} from "../../interfaces/dropdown-option.interface";
import {ChangeEventInterface} from "../../interfaces/change-event.interface";
import {OptionComponent} from "../../components/option/option.component";

@Component({
  selector: "ngy-multi-checkbox",
  standalone: true,
  templateUrl: "./multi-checkbox.component.html",
  styleUrls: ["./multi-checkbox.component.scss"],
  imports: [
    CommonModule,
    ObservableStringPipe
  ]
})
export class MultiCheckboxComponent implements OnDestroy, OnChanges, OnInit, ControlValueAccessor {
  //<editor-fold desc="Inputs">
  @Input() key!: string;

  @Input() id?: string = "";

  @Input() label?: string | Observable<string> = "";
  @Input() value?: any;

  @Input() inputType?: 'checkbox' | 'radio' = 'checkbox';

  // Clear button
  @Input() showClearButton?: boolean = false;
  @Input() clearButtonText?: string = 'Clear';

  @Input() readonly?: boolean = false;
  @Input() disabled?: boolean = false;

  @Input() orientation?: 'horizontal' | 'vertical' = 'vertical';

  @Input() options?: DropdownOption[] | Observable<DropdownOption[]> = [];
  //<editor-fold desc="Outputs">
  @Output() ngyChange = new EventEmitter<ChangeEventInterface>();
  //</editor-fold>
  @Output() ngyFocus = new EventEmitter<FocusEvent>();
  @Output() ngyBlur = new EventEmitter<FocusEvent>();
  @Output() ngyClick = new EventEmitter<MouseEvent>();
  @Output() ngyContextMenu = new EventEmitter<MouseEvent>();
  @ContentChildren(OptionComponent) optionTags?: QueryList<OptionComponent>;
  //</editor-fold>
  @Input() localizations = {
    "select_all": "Select All",
    "deselect_all": "Deselect All"
  }
  _options: DropdownOption[] = [];
  val: any;
  private optionSub?: Subscription;
  private optionTagsSub?: Subscription;

  constructor(@Optional() public control?: NgControl) {
    if (control)
      control.valueAccessor = this;
  }

  @Input() compareWith: (a: any, b: any) => boolean = (a: any, b: any) => {
    return a === b;
  };

  ngAfterContentInit(): void {
    if (this.optionTags) {
      this.handleOptionTags(this.optionTags);
      this.optionTagsSub = this.optionTags.changes.subscribe((optionTags) => {
        this.handleOptionTags(optionTags)
      })
    }

  }

  handleOptionTags(optionTags: QueryList<any>) {
    if (!optionTags || optionTags.length == 0) return;

    this.options = optionTags.map((optionComponent: OptionComponent) => ({
      label: optionComponent.label,
      value: optionComponent.value
    }))

    this.desubOptions();
    this.subOptions();
  }

  onChange: (value: any) => void = () => {
  };

  onTouched: () => void = () => {
  };

  public registerOnChange(fn: (value: any | null) => void) {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  valIncludes(arr: Array<any>, value: any) {
    if (!Array.isArray(arr)) return false;
    return arr.findIndex(v => this.compareWith(v, value)) > -1;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  writeValue(obj: any) {
    this.val = obj;
  }

  checkboxChanged($event: Event, value: any) {
    this.markAsTouched();

    const checked = ($event.target as HTMLInputElement).checked;

    this.setArrayValue(checked, value);
  }

  labelClick(option: DropdownOption) {
    if (this.disabled) return;

    this.makeArray();

    if (this.inputType == "radio") {
      this.radioChanged(option.value);
      return;
    }

    this.setArrayValue(!this.val.includes(option.value), option.value);
  }

  setArrayValue(checked: boolean, optionValue: any) {
    this.makeArray();

    if (this.val.includes(optionValue)) {
      if (!checked) {
        this.val.splice(
          this.val.findIndex((v: any) => this.compareWith(v, optionValue)),
          1
        );
      }
    } else {
      if (checked) {
        this.val.push(optionValue);
      }
    }

    this.onChange(this.val);

    this.ngyChange?.emit({
      target: null,
      value: this.val,
      type: 'change',
      originalEvent: null,
      control: this.control
    })
  }

  markAsTouched() {
    this.onTouched();
  }

  selectAll() {
    const options = this.options;

    if (!options) {
      return;
    }

    this.val = this._options.map((opt) => {
      return opt.value;
    });

    this.onChange(this.val);
  }

  deselectAll() {
    this.val = [];

    this.onChange(this.val);
  }

  radioChanged(value: any) {
    this.val = value;
    this.onChange(this.val);

    this.ngyChange?.emit({
      target: null,
      value: this.val,
      type: 'change',
      originalEvent: null,
      control: this.control
    })
  }

  ngOnDestroy(): void {
    this.desubOptions();
    if (this.optionTagsSub) {
      this.optionTagsSub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.subOptions();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['input']) {
      this.desubOptions();
      this.subOptions();
    }
  }

  subOptions() {
    if (this.options instanceof Observable) {
      this.optionSub = this.options.subscribe((options) => {
        this._options = options;
      });
      return;
    }

    this._options = this.options as DropdownOption[];
  }

  desubOptions() {
    if (this.options instanceof Observable && this.optionSub) {
      this.optionSub.unsubscribe();
    }
  }

  private makeArray() {
    // If initial or current value is not array we must ensure we have an array
    if (!Array.isArray(this.val)) {
      this.val = [];
    }
  }
}
