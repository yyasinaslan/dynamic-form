import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DropdownOption} from "../../interfaces/dropdown-option.interface";
import {Observable} from "rxjs";

@Component({
  selector: 'ngy-option',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss']
})
export class OptionComponent implements DropdownOption {
  @Input() label: string | Observable<string> = '';
  @Input() value: any = null;
}
