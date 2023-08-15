import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Optional,
  Output,
  ViewChild
} from "@angular/core";
import {ControlValueAccessor, NgControl} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {Observable} from "rxjs";
import {ObservableStringPipe} from "../../pipes/observable-string.pipe";
import {ChangeEventInterface} from "../../interfaces/change-event.interface";
import {Action} from "../../interfaces/action";

enum MaskSlotType {
  alphanumeric = 0,
  uppercase = 1,
  lowercase = 2,
  numeric = 3,
  symbol = 4,
}

interface MaskSlot {
  value: string | null,
  editable: boolean,
  type: MaskSlotType;
  pattern?: RegExp;
  formatter?: (value: string | null) => string | null
}

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
export class TextboxComponent implements OnInit, AfterViewInit, ControlValueAccessor {
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
  @Input() maskValidation?: boolean = true;
  @Input() locale?: string | string[] = 'en';
  @Input() actions?: Action[] = [];

  @Output() ngyChange = new EventEmitter<ChangeEventInterface>();
  @Output() ngyFocus = new EventEmitter<FocusEvent>();
  @Output() ngyBlur = new EventEmitter<FocusEvent>();
  @Output() ngyClick = new EventEmitter<MouseEvent>();
  @Output() ngyContextMenu = new EventEmitter<MouseEvent>();

  @ViewChild('inputRef') inputRef!: ElementRef<HTMLInputElement>;

  _val: any = null;
  maskSlots: MaskSlot[] = [];
  private unmaskedValue: string = '';
  private formatters = {
    uppercase: (value: string | null): string | null => {
      if (!value) return null;
      return value.toLocaleUpperCase(this.locale);
    },
    lowercase: (value: string | null): string | null => {
      if (!value) return null;
      return value.toLocaleLowerCase(this.locale);
    },
  }

  constructor(@Optional() public control?: NgControl) {
    if (control)
      control.valueAccessor = this;
  }

  ngAfterViewInit(): void {
    if (this.value)
      this.setInputValue();
  }

  onChange: (value: any) => void = () => {
  };

  onTouched: () => void = () => {
  };

  ngOnInit(): void {
    if (this.value) {
      this._val = this.value;
    }

    if (this.mask) {
      this.maskSlots = this.createMaskSlots() ?? [];
      this.formatAsMask(this.value ?? '');
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

  beforeInput(event: Event) {
    const target = event.target as HTMLInputElement;
    if (!target) return false;
    try {
      return this.runMask(event as InputEvent, this._val);
    } catch (e) {
      // console.warn(e)
      return false;
    }
  }

  /**
   *
   * @param event
   * @param oldValue
   */
  runMask(event: InputEvent, oldValue: string) {
    const target = event.target as HTMLInputElement;
    if (!this.mask) return true;

    const moveCursor = (index: number = target.selectionStart ?? 0) => {
      target.selectionStart = index;
      target.selectionEnd = index;
    }

    // let start = target.selectionStart ?? 0;
    // let end = target.selectionEnd ?? 0;

    let insertedIndex = target.selectionStart ?? 0
    let slot = this.maskSlots[insertedIndex];

    if (event.inputType == 'deleteContentBackward' || event.inputType == 'deleteContentForward') {
      if (event.inputType == 'deleteContentBackward') {
        insertedIndex--;
      }

      slot = this.maskSlots[insertedIndex];

      if (!slot) return false;
      while (!slot.editable) {
        if (event.inputType == 'deleteContentForward')
          insertedIndex++;
        else
          insertedIndex--;
        slot = this.maskSlots[insertedIndex];
      }
      if (!slot) return false;
      slot.value = null;

      if (event.inputType == 'deleteContentForward') {
        insertedIndex++;
      }

      this.setInputValue();
      moveCursor(insertedIndex);
      return false;
    }

    if (event.inputType != 'insertText') return false;

    let insertedChar: string | null = event.data!;

    if (!slot) throw new Error('Cannot find masking character')

    while (slot && !slot.editable) {
      insertedIndex++;
      slot = this.maskSlots[insertedIndex];
    }

    if (slot.pattern && !insertedChar.match(slot.pattern)) {
      return false;
    }

    if (slot.formatter) {
      insertedChar = slot.formatter(insertedChar);
    }

    slot.value = insertedChar;
    this.setInputValue();
    moveCursor(insertedIndex + 1);

    // If next mask character is a symbol we can add it automatically
    const nextSlot = this.maskSlots[insertedIndex + 1];
    if (nextSlot && !nextSlot.editable) {
      moveCursor(insertedIndex + 2);
    }


    this.emitValue(target.value, event);
    event.preventDefault();

    return false;
  }

  inputEvent(event: any) {
    if (!event.inputType) {
      //todo: convert input value to masked value
    }

    const target = event.target as HTMLInputElement;

    this.emitValue(target.value, event);

    return false;
  }

  renderMask(maskSlots: typeof this.maskSlots) {
    if (!this.mask) return this._val;

    return maskSlots.reduce((result, slot) => {
      if (!slot.editable) return result + slot.value;
      if (slot.value === null) return result + '_';
      return result + slot.value;
    }, '');
  }

  setInputValue() {
    if (!this.inputRef) return;
    if (!this.maskSlots) {
      this.inputRef.nativeElement.value = this._val;
      return;
    }

    this.inputRef.nativeElement.value = this.renderMask(this.maskSlots);

  }

  private replaceAt(str: string, index: number, replace: string) {
    if (index + 1 > str.length)
      return str + replace;
    return str.substring(0, index) + replace + str.substring(index + 1, str.length);
  }

  /**
   * Un masking the masked value according to the mask
   * @param mask
   * @param maskedValue
   * @private
   * @return string
   */
  private unMask(mask: string, maskedValue: string): string {

    const slots: boolean[] = [];

    for (let c of mask) {
      slots.push(!!c.match(/[A-Za-z0-9]/));
    }

    let unMasked = '';
    for (let i = 0; i < maskedValue.length; i++) {
      if (slots[i]) {
        unMasked += maskedValue[i];
      }
    }

    this.unmaskedValue = unMasked;

    return unMasked;
  }

  private emitValue(val: string, event: Event | null) {
    this._val = val;

    this.onChange(this._val);

    this.ngyChange?.emit({
      target: event?.target,
      originalEvent: event,
      value: this._val,
      type: 'change',
      control: this.control
    });
  }

  private createMaskSlots() {
    if (!this.mask) return;

    let maskSlots: (typeof this.maskSlots) = [];

    for (let i = 0; i < this.mask.length; i++) {
      const maskSlot: Partial<MaskSlot> = {};
      const maskChar = this.mask[i];

      if (maskChar == 'x' || maskChar == 'X') { // any alphanumeric
        maskSlot.pattern = /\p{Letter}|[0-9]/u;
        maskSlot.type = MaskSlotType.alphanumeric;
      } else if (maskChar.match(/[A-Z]/)) { // uppercase letters
        maskSlot.pattern = /\p{Letter}/u;
        maskSlot.type = MaskSlotType.uppercase;
        maskSlot.formatter = this.formatters.uppercase;
      } else if (maskChar.match(/[a-z]/)) { // lowercase letters
        maskSlot.pattern = /\p{Letter}/u;
        maskSlot.type = MaskSlotType.lowercase;
        maskSlot.formatter = this.formatters.lowercase;
      } else if (maskChar.match(/[0-9]/)) {  // numerical
        maskSlot.pattern = /\d/u;
        maskSlot.type = MaskSlotType.numeric;
      } else {  // Other symbols. Can be any symbol
        maskSlot.type = MaskSlotType.symbol;
      }

      maskSlot.value = maskSlot.type == MaskSlotType.symbol ? maskChar : null;
      maskSlot.editable = maskSlot.type != MaskSlotType.symbol;
      maskSlots.push(maskSlot as MaskSlot);
    }

    return maskSlots;
  }

  private formatAsMask(value: string) {
    let valIndex = 0;
    for (let slot of this.maskSlots) {
      if (!slot.editable) continue;

      if (!value[valIndex]) {
        slot.value = null;
        valIndex++;
        continue;
      }

      while (value[valIndex] && valIndex < value.length && !value[valIndex].match(/\p{Letter}|[0-9]/u)) {
        valIndex++;
      }

      slot.value = value[valIndex] ?? null
      valIndex++;
    }
  }
}
