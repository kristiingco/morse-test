import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualInstructionsComponent } from './visual-instructions.component';

describe('VisualInstructionsComponent', () => {
  let component: VisualInstructionsComponent;
  let fixture: ComponentFixture<VisualInstructionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualInstructionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
