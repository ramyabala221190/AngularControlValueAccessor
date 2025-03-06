import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomAddressComponent } from './custom-address.component';

describe('CustomAddressComponent', () => {
  let component: CustomAddressComponent;
  let fixture: ComponentFixture<CustomAddressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomAddressComponent]
    });
    fixture = TestBed.createComponent(CustomAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
