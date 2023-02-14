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

  transform(value: string | Observable<string> | undefined): string | null | undefined {
    if (!value || typeof value === 'string') {
      return value;
    }

    return this.asyncPipe.transform(value);
  }

  ngOnDestroy(): void {
    this.asyncPipe.ngOnDestroy();
  }

}
