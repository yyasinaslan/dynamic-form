import {Component, Input} from "@angular/core";
import {BaseInput} from "../../helpers/dynamic-form.interface";

@Component({
  selector: "ngy-helper-text",
  templateUrl: "./helper-text.component.html",
  styleUrls: ["./helper-text.component.scss"],
})
export class HelperTextComponent {
  @Input() input!: BaseInput<any>;
}
