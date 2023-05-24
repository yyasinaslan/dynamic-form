import {
  Component,
  ContentChild,
  ContentChildren,
  EventEmitter,
  Input,
  OnInit,
  Optional,
  Output,
  QueryList
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ControlValueAccessor, NgControl} from "@angular/forms";
import {ObservableStringPipe} from "../../pipes/observable-string.pipe";
import {Observable} from "rxjs";
import {HelperTextDirective} from "../../directives/helper-text.directive";
import {ValidatorMessageDirective} from "../../directives/validator-message.directive";
import {ChangeEventInterface} from "../../interfaces/change-event.interface";

@Component({
  selector: 'ngy-textarea',
  standalone: true,
  imports: [CommonModule, ObservableStringPipe],
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent implements OnInit, ControlValueAccessor {
  @Input() key!: string;

  @Input() id: string = "";

  @Input() label: string | Observable<string> = "";
  @Input() value?: any;

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

  _val: any;

  constructor(@Optional() public control?: NgControl) {
    if (control)
      control.valueAccessor = this;
  }

  onChange: (value: any) => void = () => {
  };

  onTouched: () => void = () => {
  };

  ngOnInit(): void {
    if (this.value) {
      this._val = this.value;
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
    this._val = obj;
  }

  valueChange($event: Event) {
    const target = $event.target as HTMLInputElement;
    if (!target) return;
    this._val = target.value;
    this.onChange(this._val);
    this.ngyChange.emit({
      target: $event.target,
      originalEvent: $event,
      value: this._val,
      type: 'change'
    });
  }
}
