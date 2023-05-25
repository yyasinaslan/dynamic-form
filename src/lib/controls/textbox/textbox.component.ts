import {Component, EventEmitter, Input, OnInit, Optional, Output} from "@angular/core";
import {ControlValueAccessor, NgControl} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {Observable} from "rxjs";
import {ObservableStringPipe} from "../../pipes/observable-string.pipe";
import {ChangeEventInterface} from "../../interfaces/change-event.interface";

@Component({
  selector: "ngy-textbox",
  standalone: true,
  templateUrl: "./textbox.component.html",
  imports: [
    ObservableStringPipe,
    CommonModule
  ],
  styleUrls: ["./textbox.component.scss"]
})
export class TextboxComponent implements OnInit, ControlValueAccessor {

  @Input() key!: string;

  @Input() id?: string = "";

  @Input() label?: string | Observable<string> = "";
  @Input() value?: any;


  @Input() inputType?: string = 'text';
  @Input() readonly?: boolean = false;
  @Input() disabled?: boolean = false;
  @Input() floating?: boolean = false;
  @Input() placeholder?: string;
  @Input() mask?: string;

  @Output() ngyChange = new EventEmitter<ChangeEventInterface>();
  @Output() ngyFocus = new EventEmitter<FocusEvent>();
  @Output() ngyBlur = new EventEmitter<FocusEvent>();
  @Output() ngyClick = new EventEmitter<MouseEvent>();
  @Output() ngyContextMenu = new EventEmitter<MouseEvent>();

  _val: any = null;

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

  valueChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (!target) return false;
    try {
      const [maskedValue, unmaskedValue] = this.runMask(event as InputEvent, this._val);

      this._val = maskedValue;

      this.onChange(unmaskedValue ?? this._val);

      this.ngyChange?.emit({
        target: event.target,
        originalEvent: event,
        value: unmaskedValue ?? this._val,
        type: 'change',
        control: this.control
      });
    } catch (e) {
      console.warn(e)
      return false;
    }

    return true;
  }

  private replaceAt(str: string, index: number, replace: string) {
    return str.substring(0, index) + replace + str.substring(index + 1, str.length);
  }

  private unmasked(mask: string, maskedValue: string) {
    return maskedValue;
  }

  /**
   *
   * @param event
   * @param oldValue
   */
  runMask(event: InputEvent, oldValue: string) {
    const target = event.target as HTMLInputElement;
    if (!this.mask) return [target.value, target.value];
    (window as any).temp1 = target;

    let val = oldValue;
    const moveCursor = (index: number = target.selectionStart ?? 0) => {
      target.selectionStart = index;
      target.selectionEnd = index;
      console.log('Cursor moved to', index)
    }
    const insertedIndex = target.selectionStart ?? 0
    const maskChar = this.mask[insertedIndex];

    if (event.inputType == 'deleteContentBackward' || event.inputType == 'deleteContentForward') {
      val = this.replaceAt(target.value, insertedIndex, ' ')
      target.value = val;
      moveCursor(insertedIndex);
      return [val, this.unmasked(this.mask, val)];
    }

    if (event.inputType != 'insertText') return [target.value, target.value];

    const insertedChar = event.data as string;

    if (!maskChar) throw new Error('Cannot find masking character')

    if (maskChar.match(/[A-Za-z]/)) {
      if (!insertedChar.match(/[A-Za-z]/)) {
        event.preventDefault();
        throw new Error('Pattern does not match')
      }

      if (maskChar == 'x' || maskChar == 'X') {
        val = this.replaceAt(target.value, insertedIndex, insertedChar.charAt(0))
      } else if (maskChar.match(/[A-Z]/)) {
        val = this.replaceAt(target.value, insertedIndex, insertedChar.charAt(0).toUpperCase())
      } else if (maskChar.match(/[a-z]/)) {
        val = this.replaceAt(target.value, insertedIndex, insertedChar.charAt(0).toLowerCase())
      }

      //
      // if (this.mask[insertedIndex + 1] && !this.mask[insertedIndex + 1].match(/[a-zA-Z0-9]/)) {
      //   val = this.replaceAt(val, insertedIndex + 1, this.mask[insertedIndex + 1])
      // }

      target.value = val;

      return [val, this.unmasked(this.mask, val)];
    }

    if (maskChar.match(/[0-9]/)) {
      if (!insertedChar.match(/[0-9]/)) {
        val = this.replaceAt(target.value, insertedIndex, oldValue.charAt(insertedIndex) ?? ' ')
        target.value = val;
        moveCursor(insertedIndex - 1);
        return [val, this.unmasked(this.mask, val)];
      }

      val = this.replaceAt(target.value, insertedIndex, insertedChar)
      target.value = val;
      return [val, this.unmasked(this.mask, val)];
    } else {
      if (insertedChar.match(/[A-Za-z0-9]/)) {
        val = this.replaceAt(target.value, insertedIndex, maskChar.charAt(0))
        target.value = val;
        moveCursor(insertedIndex - 1);
        return [val, this.unmasked(this.mask, val)];
      }
      // maskType = 'symbol';

    }

    // console.log(event)
    // if (event.inputType == 'insertText') {
    //   console.log('inserted text at', (target.selectionStart ?? 1) - 1, event.data)
    // }
    // if (event.inputType == 'deleteContentBackward') {
    //   console.log('deleted text at', target.selectionStart)
    // }
    let masked = '';

    // todo unmasking operation goes here

    return [val, val];
  }

  inputEvent(event: any) {
    console.log(event)
    if (!event.inputType) {
      //todo: convert input value to masked value
    }
    return false;
  }
}
