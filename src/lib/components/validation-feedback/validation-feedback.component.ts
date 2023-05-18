import {Component, Input} from "@angular/core";
import {AbstractControl, NgControl} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {Observable} from "rxjs";
import {ObservableStringPipe} from "../../pipes/observable-string.pipe";

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
  @Input() validatorsMessage!: { key: string; message: string | Observable<string> }[];
  @Input() control: AbstractControl | NgControl | null = null;
}
