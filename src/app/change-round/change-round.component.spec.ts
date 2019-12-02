import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeRoundComponent } from './change-round.component';

describe('ChangeRoundComponent', () => {
  let component: ChangeRoundComponent;
  let fixture: ComponentFixture<ChangeRoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeRoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeRoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
