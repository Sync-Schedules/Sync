import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailabiltyComponent } from './availabilty.component';

describe('AvailabiltyComponent', () => {
  let component: AvailabiltyComponent;
  let fixture: ComponentFixture<AvailabiltyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvailabiltyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailabiltyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
