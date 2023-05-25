import {Component, Input,} from "@angular/core";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {MultiCheckboxComponent} from "../../controls/multi-checkbox/multi-checkbox.component";
import {CheckboxComponent} from "../../controls/checkbox/checkbox.component";
import {HelperTextComponent} from "../helper-text/helper-text.component";
import {SelectComponent} from "../../controls/select/select.component";
import {TextboxComponent} from "../../controls/textbox/textbox.component";
import {TextareaComponent} from "../../controls/textarea/textarea.component";
import {InvalidMessageComponent} from "../invalid-message/invalid-message.component";

@Component({
  selector: "ngy-form-control",
  standalone: true,
  templateUrl: "./form-control.component.html",
  styleUrls: ["./form-control.component.scss"],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CheckboxComponent,
    HelperTextComponent,
    MultiCheckboxComponent,
    SelectComponent,
    TextboxComponent,
    TextareaComponent,
    InvalidMessageComponent,
  ]
})
export class FormControlComponent {
  @Input() path!: string;
  @Input() fGroup!: FormGroup;

  @Input() input?: any;
  @Input() formName!: string;
}
