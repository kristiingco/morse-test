import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputInstructionsComponent } from './input-instructions.component';

describe('InputInstructionsComponent', () => {
  let component: InputInstructionsComponent;
  let fixture: ComponentFixture<InputInstructionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputInstructionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
