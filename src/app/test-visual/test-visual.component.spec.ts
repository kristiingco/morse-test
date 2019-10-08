import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestVisualComponent } from './test-visual.component';

describe('TestVisualComponent', () => {
  let component: TestVisualComponent;
  let fixture: ComponentFixture<TestVisualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestVisualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
