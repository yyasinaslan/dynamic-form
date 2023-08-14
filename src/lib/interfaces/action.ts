export interface Action {
  label: string;
  position: 'end' | 'start';
  click: (event: MouseEvent) => void
}
