import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  QueryList,
  SimpleChanges,
  ViewChild
} from "@angular/core";
import {ControlValueAccessor, NgControl} from "@angular/forms"
import {BehaviorSubject, combineLatest, debounceTime, map, Observable, of, Subscription} from "rxjs";
import {CommonModule} from "@angular/common";
import {ObservableStringPipe} from "../../pipes/observable-string.pipe";
import {DropdownOption} from "../../interfaces/dropdown-option.interface";
import {OptionComponent} from "../../components/option/option.component";
import {createPopper, Instance, Modifier} from "@popperjs/core";
import {ChangeEventInterface} from "../../interfaces/change-event.interface";
import {ComboboxSearchType} from "../../interfaces/combobox-input.interface";


const sameWidth: Partial<Modifier<any, any>> = {
  name: "sameWidth",
  enabled: true,
  phase: "beforeWrite",
  requires: ["computeStyles"],
  fn: ({state}) => {
    state.styles["popper"].width = `${state.rects.reference.width}px`;
  },
  effect: ({state}) => {
    state.elements.popper.style.width = `${
      // @ts-ignore
      state.elements.reference.offsetWidth
    }px`;
  }
};

@Component({
  selector: "ngy-combobox",
  standalone: true,
  templateUrl: "./combobox.component.html",
  styleUrls: ["./combobox.component.scss"],
  imports: [
    ObservableStringPipe,
    CommonModule,
  ]
})
export class ComboboxComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit, AfterContentInit, ControlValueAccessor {
  //<editor-fold desc="Inputs">
  @Input() key!: string;

  @Input() id?: string = "";

  @Input() label?: string | Observable<string> = "";
  @Input() value?: any;

  @Input() multiple?: boolean = false;

  // Clear button
  @Input() showClearButton?: boolean = false;
  @Input() clearButtonText?: string = 'Clear';

  @Input() readonly?: boolean = false;
  @Input() disabled?: boolean = false;
  @Input() floating?: boolean = false;
  @Input() placeholder?: string;

  @Input() searchType: ComboboxSearchType = 'client';

  @Input() maxHeight?: string = '400px';

  @Input() options?: DropdownOption[] | Observable<DropdownOption[]> = [];
  //<editor-fold desc="Outputs">
  @Output() ngySearch = new EventEmitter<string>();
  @Output() ngyChange = new EventEmitter<ChangeEventInterface>();
  @Output() ngyFocus = new EventEmitter<FocusEvent>();
  @Output() ngyBlur = new EventEmitter<FocusEvent>();
  @Output() ngyClick = new EventEmitter<MouseEvent>();
  @Output() ngyContextMenu = new EventEmitter<MouseEvent>();
  @ContentChildren(OptionComponent) optionTags?: QueryList<OptionComponent>;
  //</editor-fold>

  @ViewChild('dropdownToggle') dropdownToggle?: ElementRef<HTMLDivElement>;
  @ViewChild('dropdownMenu') dropdownMenu?: ElementRef<HTMLDivElement>;
  @ViewChild('searchInputRef') inputSearchRef?: ElementRef<HTMLInputElement>;
  _options: DropdownOption[] = [];
  filteredOptions: DropdownOption[] = [];
  showDropdown: boolean = false;
  val: string[] | string = []; //seçili olan değer (checked)
  labels$: string | Observable<string> = new BehaviorSubject<string>('');
  private popperRef?: Instance;

  private optionsSub?: Subscription;
  private optionTagsSub?: Subscription;

  selectedItemIndex = -1;

  public search$ = new BehaviorSubject<string>("");
  private searchSub?: Subscription;


  constructor(private elRef: ElementRef, @Optional() public control?: NgControl) {
    if (control)
      control.valueAccessor = this;
  }

  @Input() compareWith: (a: any, b: any) => boolean = (a: any, b: any) => {
    return a === b;
  };

  // @HostBinding('tabindex') get tabindex() {
  //   return "auto";
  // }

  @HostListener('document:click', ['$event'])
  documentClick(event: MouseEvent) {
    const nativeEl = this.elRef.nativeElement as HTMLElement;
    if (!nativeEl.contains(event.target as HTMLElement)) {
      this.toggleDropdown(event, false);
    }
  }

  @HostListener('document:focusin', ['$event'])
  documentFocus(event: MouseEvent) {
    if (!this.elRef?.nativeElement.contains(event.target as HTMLElement)) {
      this.toggleDropdown(event, false)
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  documentEscape(event: MouseEvent) {
    this.toggleDropdown(event, false);
  }

  //<editor-fold desc="Angular hooks">
  ngOnDestroy(): void {
    this.unSubAll();

    if (this.popperRef) {
      this.popperRef.destroy();
    }
  }

  ngOnInit(): void {
    if (this.value) {
      this.val = this.value;
    }
    this.subOptions();
    this.subSearch();
    this.calcLabels();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['input']) {
      if (this.optionsSub)
        this.optionsSub.unsubscribe();
      this.subOptions();
    }
  }

  ngAfterContentInit(): void {
    if (this.optionTags) {
      this.handleOptionTags(this.optionTags);
      this.optionTagsSub = this.optionTags.changes.subscribe((optionTags) => {
        this.handleOptionTags(optionTags)
      })
    }

  }

  ngAfterViewInit(): void {
    if (!this.dropdownToggle || !this.dropdownMenu) return;

    this.popperRef = createPopper(this.dropdownToggle.nativeElement, this.dropdownMenu.nativeElement, {
      strategy: 'fixed',
      modifiers: [sameWidth]
    })
  }

  //</editor-fold>

  handleOptionTags(optionTags: QueryList<any>) {
    if (!optionTags || optionTags.length == 0) return;

    this.options = optionTags.map((optionComponent: OptionComponent) => ({
      label: optionComponent.label,
      value: optionComponent.value
    }))

    this.unSubAll();
    this.subOptions();
    this.calcLabels();
  }

  onChange: (value: any) => void = () => {
  };

  onTouched: () => void = () => {
  };

  calcLabels() {
    this.labels$ = this.labels();
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

  clickedControl(event: MouseEvent, value: any, label: any) {
    this.val = value;
    this.onChange(this.val);
    this.toggleDropdown(event, false)
    this.calcLabels();

    this.ngyChange?.emit({
      target: this.dropdownToggle!.nativeElement,
      value: this.val,
      type: 'change',
      originalEvent: null,
      control: this.control
    })

    if (this.searchType == 'client')
      this.search$.next('');
  }

  changeCheckControl(event: any, option: DropdownOption, forceState?: boolean) {
    if (!this.multiple) return;

    if (!Array.isArray(this.val)) this.val = [this.val];

    const checked = forceState ? forceState : event.target.checked;
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

    this.ngyChange?.emit({
      target: this.dropdownToggle!.nativeElement,
      value: this.val,
      type: 'change',
      originalEvent: null,
      control: this.control
    })
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

  toggleDropdown(event: Event, state?: boolean) {
    if (this.disabled) {
      return;
    }

    this.showDropdown = state !== undefined ? state : !this.showDropdown;

    if (this.dropdownMenu) {
      if (this.showDropdown)
        this.dropdownMenu.nativeElement.classList.add('show');
      else
        this.dropdownMenu.nativeElement.classList.remove('show');

      if (this.popperRef) this.popperRef.update().then((state) => {
        if (this.showDropdown) {
          if (this.inputSearchRef) {
            this.inputSearchRef.nativeElement.focus();
          }
          if (this.dropdownToggle) {
            this.dropdownToggle.nativeElement.setAttribute('tabindex', '-1');
          }

          // Find current selection index and set selected item index
          const index = this.filteredOptions.findIndex(opt => this.valIncludes(this.val, opt.value));
          if (index >= 0) {
            this.selectedItemIndex = index;
            this.scrollToItem();
          } else {
            this.selectedItemIndex = -1;
          }
        } else {

          if (this.searchType == 'client') {
            this.search$.next('');
          }

          if (this.dropdownToggle) {
            this.dropdownToggle.nativeElement.removeAttribute('tabindex');
          }
        }
      });
    }
  }

  /**
   * Returns true if selected array has value in it
   * @param arr
   * @param value
   */
  valIncludes(arr: Array<any> | any, value: any) {
    if (!Array.isArray(arr)) return arr == value;
    return arr.findIndex(v => this.compareWith(v, value)) > -1;
  }

  unSubAll() {
    if (this.optionsSub)
      this.optionsSub.unsubscribe();
    if (this.optionTagsSub)
      this.optionTagsSub.unsubscribe();
    if (this.searchSub)
      this.searchSub.unsubscribe();
  }

  subOptions() {
    if (this.options instanceof Observable) {
      this.optionsSub = this.options.subscribe((options) => {
        if (options) {
          this._options = options;
          this.filteredOptions = options;
          this.calcLabels();

          // Re apply search term if it is client sided
          if (this.searchType == 'client')
            this.search$.next(this.search$.getValue());
        }
      });

      return;
    }

    this._options = this.options ?? [];
    this.calcLabels();

  }

  subSearch() {
    this.searchSub = this.search$.pipe(debounceTime(200)).subscribe(searchTerm => {

      if (this.searchType == 'server') {
        this.ngySearch.emit(searchTerm)
        return;
      }

      if (!searchTerm || searchTerm == '') {
        this.filteredOptions = this._options;
        return;
      }

      // Using last word for searching
      if (this.multiple) {
        const splitted = searchTerm.split(',').map(s => s.trim());
        searchTerm = splitted[splitted.length - 1]
      }

      this.filteredOptions = this._options.filter(opt => {
        let label = "";
        if (opt.label instanceof Observable) {
          // It should be behavior subject otherwise we cant know the label until next value
          if ((opt.label as BehaviorSubject<string>).getValue)
            label = (opt.label as BehaviorSubject<string>).getValue();
        } else {
          label = opt.label;
        }

        return label.toLowerCase().includes(searchTerm.toLowerCase());
      })

      if (this.filteredOptions.length > 0 || this.selectedItemIndex < 0 || this.selectedItemIndex > this.filteredOptions.length - 1) {
        this.selectedItemIndex = 0;
      }
    });

    // // Initial search for server type search
    // this.search$.next('');
  }

  inputFocused($event: FocusEvent) {
    this.toggleDropdown($event, true);
    //
    // setTimeout(() => {
    //   const input = this.inputSearchRef?.nativeElement;
    //
    //   if (input) {
    //     input.value = '';
    //     input.focus();
    //   }
    // }, 500)

  }

  selectItem(index: number, event?: any) {
    const option = this.filteredOptions[index];
    if (!option) return;

    if (!this.multiple) {
      this.clickedControl(event as MouseEvent, option.value, option.label)
      this.selectedItemIndex = -1;
      return;
    }

    this.changeCheckControl(event as MouseEvent, option, !this.valIncludes(this.val as Array<any>, option.value));
  }

  inputBlurred($event: any) {
    this.selectedItemIndex = -1;
  }

  inputEnter(event: any) {
    event.preventDefault();
    if (this.selectedItemIndex < 0 || this.selectedItemIndex > this.filteredOptions.length - 1) return;
    this.selectItem(this.selectedItemIndex, event);
    if (!this.multiple)
      this.toggleDropdown(event, false)
  }

  arrowDown(event: any) {
    event.preventDefault();
    if (this.selectedItemIndex >= this.filteredOptions.length - 1) {
      this.selectedItemIndex = 0;
    } else {
      this.selectedItemIndex++;
    }

    this.scrollToItem();

  }

  arrowUp(event: any) {
    event.preventDefault();
    if (this.selectedItemIndex <= 0) {
      this.selectedItemIndex = this.filteredOptions.length - 1;
    } else {
      this.selectedItemIndex--;
    }

    this.scrollToItem();
  }

  emptySelection() {
    if (Array.isArray(this.val)) {
      this.val = [];
    } else {
      this.val = '';
    }

    this.onChange(this.val);
    this.calcLabels();

    this.ngyChange?.emit({
      target: this.dropdownToggle!.nativeElement,
      value: this.val,
      type: 'change',
      originalEvent: null,
      control: this.control
    })
  }

  searchInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    this.search$.next(value);
  }

  inputEscape(event: any) {
    this.toggleDropdown(event, false);
  }

  toggleClick(event: MouseEvent) {
    if (this.showDropdown) {
      this.toggleDropdown(event, false)
    } else {
      this.toggleDropdown(event, true)
    }
  }

  inputTab(event: any) {
    if (this.elRef) {
      const clearButton = (this.elRef.nativeElement as HTMLElement).querySelector('.ngy-combobox-clear-button');
      if (clearButton) {
        (clearButton as HTMLButtonElement).focus();
        event.preventDefault();
      }
    }
  }

  focusSearch() {
    this.inputSearchRef?.nativeElement.focus();
  }

  scrollToItem() {
    const menu = this.dropdownMenu?.nativeElement;
    if (menu) {
      const itemScroller = menu.querySelector('.ngy-combobox-item-list') as HTMLDivElement;
      if (!itemScroller) return;

      const child = itemScroller.children[this.selectedItemIndex] as HTMLElement;
      if (!child) return;

      const startOfChild = child.offsetTop;
      const endOfChild = child.offsetTop + child.clientHeight;
      if (startOfChild < itemScroller.scrollTop)
        itemScroller.scrollTo({top: child.offsetTop});

      if (endOfChild > itemScroller.scrollTop + itemScroller.clientHeight)
        itemScroller.scrollTo({top: child.offsetTop - itemScroller.clientHeight + child.clientHeight});
    }
  }
}
