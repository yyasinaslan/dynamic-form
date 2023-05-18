import {Component, Input} from "@angular/core";
import {Observable} from "rxjs";
import {ObservableStringPipe} from "../../pipes/observable-string.pipe";

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
  @Input() text!: string | Observable<string>;
}
