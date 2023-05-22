export interface ChangeEventInterface<T = any> {
  target: any,
  originalEvent: any,
  value: T,
  type: string
}
