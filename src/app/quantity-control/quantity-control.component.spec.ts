import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantityControlComponent } from './quantity-control.component';

describe('QuantityControlComponent', () => {
  let component: QuantityControlComponent;
  let fixture: ComponentFixture<QuantityControlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuantityControlComponent]
    });
    fixture = TestBed.createComponent(QuantityControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
