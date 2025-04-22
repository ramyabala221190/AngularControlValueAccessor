import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomPhoneComponent } from './custom-phone.component';

describe('CustomPhoneComponent', () => {
  let component: CustomPhoneComponent;
  let fixture: ComponentFixture<CustomPhoneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomPhoneComponent]
    });
    fixture = TestBed.createComponent(CustomPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
