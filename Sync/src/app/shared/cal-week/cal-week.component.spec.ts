import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalWeekComponent } from './cal-week.component';

describe('CalWeekComponent', () => {
  let component: CalWeekComponent;
  let fixture: ComponentFixture<CalWeekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalWeekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
