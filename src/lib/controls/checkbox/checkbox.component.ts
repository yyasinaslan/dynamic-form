import {Component, EventEmitter, Input, OnInit, Optional, Output} from "@angular/core";
import {ControlValueAccessor, NgControl} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {ObservableStringPipe} from "../../pipes/observable-string.pipe";
import {Observable} from "rxjs";
import {ChangeEventInterface} from "../../interfaces/change-event.interface";

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
export class CheckboxComponent implements ControlValueAccessor, OnInit {
  @Input() key!: string;
  @Input() type: 'checkbox' | 'switch' = 'checkbox';

  @Input() id?: string = "";

  @Input() label?: string | Observable<string> = "";
  @Input() value?: any;

  @Input() readonly?: boolean = false;
  @Input() disabled?: boolean = false;

  @Output() ngyChange = new EventEmitter<ChangeEventInterface>();
  @Output() ngyFocus = new EventEmitter<FocusEvent>();
  @Output() ngyBlur = new EventEmitter<FocusEvent>();
  @Output() ngyClick = new EventEmitter<MouseEvent>();
  @Output() ngyContextMenu = new EventEmitter<MouseEvent>();

  val: boolean = false;

  constructor(@Optional() public control?: NgControl) {
    if (control)
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
    if (!target) return;

    this.val = target.checked;
    this.onChange(this.val);
    this.ngyChange?.emit({
      target: event.target,
      originalEvent: event,
      value: this.val,
      type: 'change',
      control: this.control
    })
  }

  labelClick(event: MouseEvent) {
    if (this.disabled) return;
    this.val = !this.val;
    this.onChange(this.val);
    this.ngyChange?.emit({
      target: event.target,
      originalEvent: event,
      value: this.val,
      type: 'change',
      control: this.control
    })
  }
}
