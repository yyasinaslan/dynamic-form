export const codeExamples = {
  //<editor-fold desc="Textbox">
  textbox: `<ngy-textbox label="Label of textbox"
      key="textBox"
      (ngyChange)="eventTest($event)"
      (ngyFocus)="eventTest($event)"
      (ngyBlur)="eventTest($event)"
      (ngyClick)="eventTest($event)"
      (ngyContextMenu)="eventTest($event)"

      name="textBox"
      [(ngModel)]="model1"
      [required]="true" [minlength]="5" [maxlength]="10"
>
  <ng-template ngyHelperText>This is helper text</ng-template>

  <ng-template ngyValidatorMessage="required">Required</ng-template>
  <ng-template ngyValidatorMessage="minlength">Min length must be 5</ng-template>
  <ng-template ngyValidatorMessage="maxlength">Max length must be 10</ng-template>
</ngy-textbox>`,
  //</editor-fold>

  //<editor-fold desc="Textarea">
  textarea: `<ngy-textarea label="Textarea"
                    key="textArea"
                    [(ngModel)]="model2"
                    name="textArea"
                    (ngyChange)="eventTest($event)"
                    (ngyFocus)="eventTest($event)"
                    (ngyBlur)="eventTest($event)"
                    (ngyClick)="eventTest($event)"
                    (ngyContextMenu)="eventTest($event)"
                    [required]="true" [minlength]="5" [maxlength]="10"
      >
        <ng-template ngyHelperText>This is helper text</ng-template>

        <ng-template ngyValidatorMessage="required">required</ng-template>
        <ng-template ngyValidatorMessage="minlength">min length must be 5</ng-template>
        <ng-template ngyValidatorMessage="maxlength">max length must be 10</ng-template>
</ngy-textarea>`,
  //</editor-fold>

  //<editor-fold desc="Select">
  select: `<ngy-select label="Select"
                  key="select"
                  (ngyChange)="eventTest($event)"
                  (ngyFocus)="eventTest($event)"
                  (ngyBlur)="eventTest($event)"
                  (ngyClick)="eventTest($event)"
                  (ngyContextMenu)="eventTest($event)"

                  [multiple]="true"

                  [(ngModel)]="model3"
                  name="select"
                  [required]="true" [minlength]="2" [maxlength]="3"
      >
        <ngy-option [value]="'item1'" label="Item 1"/>
        <ngy-option [value]="'item2'" label="Item 2"/>
        <ngy-option value="item3" label="Item 3"/>
        <ngy-option value="item4" label="Item 4"/>
        <ngy-option value="item5" label="Item 5"/>

        <ng-template ngyHelperText>This is helper text</ng-template>

        <ng-template ngyValidatorMessage="required">required</ng-template>
        <ng-template ngyValidatorMessage="minlength">min length must be 2</ng-template>
        <ng-template ngyValidatorMessage="maxlength">max length must be 3</ng-template>
</ngy-select>`,
  //</editor-fold>

  //<editor-fold desc="Switch">
  'switch': `<ngy-switch label="Switch example"
                    key="switch"
                    (ngyChange)="eventTest($event)"
                    (ngyFocus)="eventTest($event)"
                    (ngyBlur)="eventTest($event)"
                    (ngyClick)="eventTest($event)"
                    (ngyContextMenu)="eventTest($event)"

                    ngModel
                    name="switch"
                    [required]="true"
        >
          <ng-template ngyHelperText>This is helper text</ng-template>

          <ng-template ngyValidatorMessage="required">Required</ng-template>
        </ngy-switch>`,
  //</editor-fold>
}
