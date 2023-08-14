# Dynamic Form for Angular 15 + Bootstrap 5

[![Downloads](https://img.shields.io/npm/dm/@yyasinaslan/dynamic-form?style=flat-square)](https://www.npmjs.com/package/@yyasinaslan/dynamic-form)

This component library helps you to generate form template with configuration objects.

[Demo Site](https://dynamic-form-one.vercel.app/) | [Npm Package](https://www.npmjs.com/package/@yyasinaslan/dynamic-form) | [Github](https://github.com/yyasinaslan/dynamic-form)

[Compatibility](docs/Compatibilty.md)

Advanced usage and detailed documentation will be added soon...

## Installation

Install package with npm or yarn

```shell
yarn add @yyasinaslan/dynamic-form
#or
npm install @yyasinaslan/dynamic-form
```

In your angular.json or style.scss include this library styles

`angular.json`

```json
{
  ...
  "styles": [
    "node_modules/@yyasinaslan/dynamic-form/styles/dynamic-form.css"
  ]
  ...
}
```

`style.scss`

```scss
@import "node_modules/@yyasinaslan/dynamic-form/styles/dynamic-form.scss";
```

Import DynamicFormModule to your module or standalone component

```typescript
import {DynamicFormModule} from "@yyasinaslan/dynamic-form";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DynamicFormModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
```

That's it.

Be careful this package is still under development.

## Basic usage

Define your inputs in app component, or anywhere you want like below.

```typescript

export class AppComponent {

  inputs = [
    new TextBoxInput({
      key: 'firstName',
      value: '',
      label: 'Firstname',
      validators: [Validators.required],
      validatorsMessage: [{key: 'required', message: 'Firstname required'}]
    }),
    new TextBoxInput({
      key: 'lastName',
      value: '',
      label: 'Lastname',
      validators: [Validators.required],
      validatorsMessage: [{key: 'required', message: 'Lastname required'}]
    }),
  ]

  formSubmitHandler(event: FormGroup) {
    // You can get form value with event object
  }
}
```

In app.component.html you can use dynamic form like this

```html

<ngy-dynamic-form
  [inputs]="inputs"
  (post)="formSubmitHandler($event)"
  formName="userForm"></ngy-dynamic-form>
```

This will generate form with automatic layout (Bootstrap grid used)

![](./docs/images/example-form-view.png)
