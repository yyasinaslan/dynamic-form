import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeclarativeExamplesComponent} from './declarative-examples.component';

describe('DeclarativeExamplesComponent', () => {
  let component: DeclarativeExamplesComponent;
  let fixture: ComponentFixture<DeclarativeExamplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeclarativeExamplesComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DeclarativeExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
