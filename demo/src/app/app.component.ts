import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ClassicExamplesComponent} from "./classic-examples/classic-examples.component";
import {ImperativeExamplesComponent} from "./imperative-examples/imperative-examples.component";
import {TemplateDrivenExamplesComponent} from "./template-driven-examples/template-driven-examples.component";
import {environment} from "environment";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ClassicExamplesComponent, ImperativeExamplesComponent, TemplateDrivenExamplesComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'demo'

  exampleType = localStorage.getItem('example') ?? 'classic';
  appVersion = environment.version;

  ngOnInit(): void {
  }

  setExampleType(type: string) {
    this.exampleType = type;
    localStorage.setItem('example', type);
  }


}
