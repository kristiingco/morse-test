import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioItemComponent } from './audio-item.component';

describe('AudioItemComponent', () => {
  let component: AudioItemComponent;
  let fixture: ComponentFixture<AudioItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudioItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
