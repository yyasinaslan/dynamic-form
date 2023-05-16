import {Component, Input} from "@angular/core";
import {BaseInput} from "dynamic-form/common/base-input";
import {ObservableStringPipe} from "dynamic-form/pipes/observable-string.pipe";

@Component({
  selector: "ngy-helper-text",
  standalone: true,
  templateUrl: "./helper-text.component.html",
  styleUrls: ["./helper-text.component.scss"],
  imports: [
    ObservableStringPipe
  ]
})
export class HelperTextComponent {
  @Input() input!: BaseInput<any>;
}
