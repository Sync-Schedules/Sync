import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectDjComponent } from './select-dj.component';

describe('SelectDjComponent', () => {
  let component: SelectDjComponent;
  let fixture: ComponentFixture<SelectDjComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectDjComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectDjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
