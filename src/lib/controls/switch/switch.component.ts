import {Component, ContentChild, ContentChildren, EventEmitter, Input, Output, QueryList} from "@angular/core";
import {ControlValueAccessor, NgControl} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {ObservableStringPipe} from "../../pipes/observable-string.pipe";
import {Observable} from "rxjs";
import {ChangeEventInterface} from "../../interfaces/change-event.interface";
import {HelperTextDirective} from "../../directives/helper-text.directive";
import {ValidatorMessageDirective} from "../../directives/validator-message.directive";

@Component({
  selector: "ngy-switch",
  standalone: true,
  templateUrl: "./switch.component.html",
  styleUrls: ["./switch.component.scss"],
  imports: [
    CommonModule,
    ObservableStringPipe
  ]
})
export class SwitchComponent implements ControlValueAccessor {
  @Input() key!: string;

  @Input() id: string = "";

  @Input() label: string | Observable<string> = "";

  @Input() value?: boolean;


  @Input() type: string = 'text';
  @Input() readonly: boolean = false;
  @Input() disabled: boolean = false;
  @Input() floating: boolean = false;
  @Input() placeholder?: string;

  @Output() ngyChange = new EventEmitter<ChangeEventInterface>();
  @Output() ngyFocus = new EventEmitter<FocusEvent>();
  @Output() ngyBlur = new EventEmitter<FocusEvent>();
  @Output() ngyClick = new EventEmitter<MouseEvent>();
  @Output() ngyContextMenu = new EventEmitter<MouseEvent>();

  @ContentChild(HelperTextDirective) helperTextTemplate?: HelperTextDirective;
  @ContentChildren(ValidatorMessageDirective) validatorsMessage!: QueryList<ValidatorMessageDirective>;

  val?: boolean;

  constructor(public control: NgControl) {
    control.valueAccessor = this;
  }

  onChange: (value: any) => void = () => {
  };

  onTouched: () => void = () => {
  };

  ngOnInit(): void {
    if (this.value !== undefined) {
      this.val = this.value;
    }
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

  valChanged(event: Event) {
    const target = event.target as HTMLInputElement;
    this.val = target.checked;

    this.onChange(this.val);
    this.ngyChange.emit({
      target: event.target,
      originalEvent: event,
      value: this.val,
      type: 'change'
    })
  }

  labelClick() {
    if (this.disabled) return;
    this.val = !this.val;
    this.onChange(this.val);
  }
}
