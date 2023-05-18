import {Directive, TemplateRef} from '@angular/core';

@Directive({
  selector: '[ngyHelperText]',
  standalone: true
})
export class HelperTextDirective {

  constructor(public templateRef: TemplateRef<any>) {
  }

}
