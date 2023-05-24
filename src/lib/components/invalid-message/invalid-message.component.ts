import {Component, inject, Input, Optional} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgControl} from "@angular/forms";

@Component({
  selector: 'ngy-invalid-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invalid-message.component.html',
  styleUrls: ['./invalid-message.component.scss']
})
export class InvalidMessageComponent {
  @Input() errorName?: string;
  @Optional() control?: NgControl = inject(NgControl);
}
