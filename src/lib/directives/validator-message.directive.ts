import {Directive, Input, TemplateRef} from '@angular/core';

@Directive({
  selector: '[ngyValidatorMessage]',
  standalone: true
})
export class ValidatorMessageDirective {

  @Input() ngyValidatorMessage!: string;

  constructor(public templateRef: TemplateRef<string>) {
    console.log({templateRef})
  }

}
