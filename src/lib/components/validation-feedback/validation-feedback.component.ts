import {Component, Input} from "@angular/core";
import {AbstractControl} from "@angular/forms";
import {BaseInput} from "dynamic-form/common/base-input";
import {ObservableStringPipe} from "dynamic-form/pipes/observable-string.pipe";
import {CommonModule} from "@angular/common";

@Component({
  selector: "ngy-validation-feedback",
  standalone: true,
  templateUrl: "./validation-feedback.component.html",
  styleUrls: ["./validation-feedback.component.scss"],
  imports: [
    CommonModule,
    ObservableStringPipe
  ]
})
export class ValidationFeedbackComponent {
  @Input() input!: BaseInput<any>;
  @Input() control: AbstractControl | null = null;
}
