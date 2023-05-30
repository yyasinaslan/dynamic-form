import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ClassicExamplesComponent} from './classic-examples.component';

describe('ClassicExamplesComponent', () => {
  let component: ClassicExamplesComponent;
  let fixture: ComponentFixture<ClassicExamplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassicExamplesComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ClassicExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
