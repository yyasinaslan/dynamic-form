import {ObservableStringPipe} from './observable-string.pipe';

describe('ObservableStringPipe', () => {
  it('create an instance', () => {
    const pipe = new ObservableStringPipe();
    expect(pipe).toBeTruthy();
  });
});
