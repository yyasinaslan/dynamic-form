import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ClassicExamplesComponent} from "./classic-examples/classic-examples.component";
import {ImperativeExamplesComponent} from "./imperative-examples/imperative-examples.component";
import {DeclarativeExamplesComponent} from "./declarative-examples/declarative-examples.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ClassicExamplesComponent, ImperativeExamplesComponent, DeclarativeExamplesComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'demo'

  exampleType = localStorage.getItem('example') ?? 'classic';

  ngOnInit(): void {
  }

  setExampleType(type: string) {
    this.exampleType = type;
    localStorage.setItem('example', type);
  }


}
