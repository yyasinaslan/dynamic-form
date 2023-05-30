import {Component, Input, OnInit, Optional} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormGroup, NgControl} from "@angular/forms";
import {DynamicFormComponent} from "../../dynamic-form.component";

@Component({
  selector: 'ngy-invalid-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invalid-message.component.html',
  styleUrls: ['./invalid-message.component.scss']
})
export class InvalidMessageComponent implements OnInit {
  @Input() key?: string;
  @Input() errorName?: string;

  private fGroup?: FormGroup;

  constructor(@Optional() public dynamicFormComponent?: DynamicFormComponent, @Optional() public control?: NgControl) {

  }

  ngOnInit(): void {
    if (this.dynamicFormComponent && this.dynamicFormComponent.form) {
      this.fGroup = this.dynamicFormComponent.form;
      this.control = this.fGroup.controls[this.key!] as any;
    }
  }
}
