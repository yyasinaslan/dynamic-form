import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImperativeExamplesComponent } from './imperative-examples.component';

describe('ImperativeExamplesComponent', () => {
  let component: ImperativeExamplesComponent;
  let fixture: ComponentFixture<ImperativeExamplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ImperativeExamplesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImperativeExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
