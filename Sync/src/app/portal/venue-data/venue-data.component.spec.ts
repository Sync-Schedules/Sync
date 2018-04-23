import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueDataComponent } from './venue-data.component';

describe('VenueDataComponent', () => {
  let component: VenueDataComponent;
  let fixture: ComponentFixture<VenueDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenueDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenueDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
