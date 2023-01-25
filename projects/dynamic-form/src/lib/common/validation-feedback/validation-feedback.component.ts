import {Component, Input} from "@angular/core";
import {AbstractControl} from "@angular/forms";
import {BaseInput} from "../../helpers/dynamic-form.interface";

@Component({
  selector: "ngy-validation-feedback",
  templateUrl: "./validation-feedback.component.html",
  styleUrls: ["./validation-feedback.component.scss"],
})
export class ValidationFeedbackComponent {
  @Input() input!: BaseInput<any>;
  @Input() control: AbstractControl | null = null;
}
