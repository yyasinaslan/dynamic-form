export const codeExamples = {
  invalidMessage: `<ngy-textbox label="Label of textbox" ngModel name="textBox"  [required]="true" [minlength]="5" [maxlength]="10">
  <ngy-invalid-message errorName="required">Textbox is required</ngy-invalid-message>
  <ngy-invalid-message errorName="minlength">Min length must be 5</ngy-invalid-message>
  <ngy-invalid-message errorName="maxlength">Max length must be 10</ngy-invalid-message>
</ngy-textbox>`,

  helperTextComponent: `<!-- helper-text.component.html -->
<div class="form-text">
  <ng-content/>
</div>`,

  helperText: `<ngy-helper-text>Helper text content</ngy-helper-text>`,

  //<editor-fold desc="Textbox">
  textbox: `<ngy-textbox label="Label of textbox"
                     key="textBox"
                     (ngyChange)="eventTest($event)"
                     (ngyFocus)="eventTest($event)"
                     (ngyBlur)="eventTest($event)"
                     (ngyClick)="eventTest($event)"
                     (ngyContextMenu)="eventTest($event)"

                     ngModel
                     name="textBox"
                     [required]="true" [minlength]="5" [maxlength]="10"
        >

          <ngy-helper-text>This is helper text</ngy-helper-text>
          <ngy-invalid-message errorName="required">Textbox is required</ngy-invalid-message>
          <ngy-invalid-message errorName="minlength">Min length must be 5</ngy-invalid-message>
          <ngy-invalid-message errorName="maxlength">Max length must be 10</ngy-invalid-message>
        </ngy-textbox>`,
  //</editor-fold>

  //<editor-fold desc="Textarea">
  textarea: `<ngy-textarea label="Textarea"
                      key="textArea"
                      ngModel
                      name="textArea"
                      (ngyChange)="eventTest($event)"
                      (ngyFocus)="eventTest($event)"
                      (ngyBlur)="eventTest($event)"
                      (ngyClick)="eventTest($event)"
                      (ngyContextMenu)="eventTest($event)"
                      [required]="true" [minlength]="5" [maxlength]="10"
        >
          <ngy-helper-text>This is helper text</ngy-helper-text>
          <ngy-invalid-message errorName="required">Required</ngy-invalid-message>
          <ngy-invalid-message errorName="minlength">Min length must be 5</ngy-invalid-message>
          <ngy-invalid-message errorName="maxlength">Max length must be 10</ngy-invalid-message>
        </ngy-textarea>`,
  //</editor-fold>

  //<editor-fold desc="Select">
  select: `<ngy-select label="Select"
                    key="select"
                    [multiple]="true"
                    (ngyChange)="eventTest($event)"
                    (ngyFocus)="eventTest($event)"
                    (ngyBlur)="eventTest($event)"
                    (ngyClick)="eventTest($event)"
                    (ngyContextMenu)="eventTest($event)"

                    ngModel
                    name="select"
                    [required]="true" [minlength]="2" [maxlength]="3"
        >
          <ngy-option [value]="'item1'" label="Item 1"/>
          <ngy-option [value]="'item2'" label="Item 2"/>
          <ngy-option value="item3" label="Item 3"/>
          <ngy-option value="item4" label="Item 4"/>
          <ngy-option value="item5" label="Item 5"/>

          <ngy-helper-text>This is helper text</ngy-helper-text>
          <ngy-invalid-message errorName="required">Required</ngy-invalid-message>
          <ngy-invalid-message errorName="minlength">Min length must be 2</ngy-invalid-message>
          <ngy-invalid-message errorName="maxlength">Max length must be 3</ngy-invalid-message>
        </ngy-select>`,
  //</editor-fold>

  //<editor-fold desc="Switch">
  'switch': `<ngy-checkbox type="switch" label="Switch example"
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
          <ngy-helper-text>This is helper text</ngy-helper-text>
          <ngy-invalid-message errorName="required">Required</ngy-invalid-message>
        </ngy-checkbox>`,
  //</editor-fold>

  //<editor-fold desc="Checkbox">
  'checkbox': `<ngy-checkbox label="Checkbox example"
                      key="checkbox"
                      (ngyChange)="eventTest($event)"
                      (ngyFocus)="eventTest($event)"
                      (ngyBlur)="eventTest($event)"
                      (ngyClick)="eventTest($event)"
                      (ngyContextMenu)="eventTest($event)"

                      [value]="true"

                      ngModel
                      name="checkbox"
                      [required]="true"
        >
          <ngy-helper-text>This is helper text</ngy-helper-text>
          <ngy-invalid-message errorName="required">Required</ngy-invalid-message>
        </ngy-checkbox>`,
  //</editor-fold>

  //<editor-fold desc="checkboxGroup">
  'checkboxGroup': `<ngy-multi-checkbox inputType="checkbox" label="Checkbox group"
                            key="checkboxGroup"
                            (ngyChange)="eventTest($event)"
                            (ngyFocus)="eventTest($event)"
                            (ngyBlur)="eventTest($event)"
                            (ngyClick)="eventTest($event)"
                            (ngyContextMenu)="eventTest($event)"

                            ngModel
                            name="checkboxGroup"
                            [required]="true" [minlength]="2" [maxlength]="3"
        >
          <ngy-option [value]="'item1'" label="Item 1"/>
          <ngy-option [value]="'item2'" label="Item 2"/>
          <ngy-option value="item3" label="Item 3"/>
          <ngy-option value="item4" label="Item 4"/>
          <ngy-option value="item5" label="Item 5"/>

          <ngy-helper-text>This is helper text</ngy-helper-text>
          <ngy-invalid-message errorName="required">Required</ngy-invalid-message>
          <ngy-invalid-message errorName="minlength">Min length must be 2</ngy-invalid-message>
          <ngy-invalid-message errorName="maxlength">Max length must be 3</ngy-invalid-message>
        </ngy-multi-checkbox>`,
  //</editor-fold>

  //<editor-fold desc="radioGroup">
  'radioGroup': `<ngy-multi-checkbox inputType="radio"
                            orientation="horizontal"
                            label="Radio Group"
                            key="radioGroup"
                            (ngyChange)="eventTest($event)"
                            (ngyFocus)="eventTest($event)"
                            (ngyBlur)="eventTest($event)"
                            (ngyClick)="eventTest($event)"
                            (ngyContextMenu)="eventTest($event)"

                            ngModel
                            name="radioGroup"
                            [required]="true"
        >
          <ngy-option [value]="'item1'" label="Item 1"/>
          <ngy-option [value]="'item2'" label="Item 2"/>
          <ngy-option value="item3" label="Item 3"/>
          <ngy-option value="item4" label="Item 4"/>
          <ngy-option value="item5" label="Item 5"/>

          <ngy-helper-text>This is helper text</ngy-helper-text>
          <ngy-invalid-message errorName="required">Required</ngy-invalid-message>
        </ngy-multi-checkbox>`,
  //</editor-fold>
}
