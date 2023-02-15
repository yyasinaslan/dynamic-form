import {ChangeDetectorRef, OnDestroy, Pipe, PipeTransform} from '@angular/core';
import {Observable} from "rxjs";
import {AsyncPipe} from "@angular/common";

/**
 * If we don't know string is observable or not. We can use this pipe.
 */
@Pipe({
  name: 'observableString',
  pure: false
})
export class ObservableStringPipe implements PipeTransform, OnDestroy {

  private asyncPipe: AsyncPipe;

  constructor(private cdr: ChangeDetectorRef) {
    this.asyncPipe = new AsyncPipe(this.cdr);
  }

  transform(value: string | number | Observable<string> | undefined): string | null {
    if (!value) return '';

    if (value instanceof Observable) {
      return this.asyncPipe.transform(value);
    }

    return String(value);
  }

  ngOnDestroy(): void {
    this.asyncPipe.ngOnDestroy();
  }

}
