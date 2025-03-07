import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const QUANTITY_CONTROL_PROVIDER={
  provide:NG_VALUE_ACCESSOR,
  useExisting:forwardRef(()=>QuantityControlComponent),
  multi:true
}

@Component({
  selector: 'app-quantity-control',
  templateUrl: './quantity-control.component.html',
  styleUrls: ['./quantity-control.component.scss'],
  providers:[QUANTITY_CONTROL_PROVIDER]
})
export class QuantityControlComponent implements ControlValueAccessor {

  private onChange!:Function;
  private onTouched!:Function;
  quantity:number=0;
  
  writeValue(qty:number): void {
    //Update the value when FormControl changes
    this.quantity=qty;
    console.log("Form Control value has changed")
  }
  registerOnChange(fn: Function): void {
    //update the FormControl, when value changes
    this.onChange=(qty:number)=>{
      console.log("Update the FormControl Value")
      fn(qty);
    }
  }
  registerOnTouched(fn: Function): void {
    this.onTouched=fn;
  }
  
  addQuantity(){
    this.quantity++;
    this.onChange(this.quantity)  // update the FormControl, when value changes
  }

  removeQuantity(){
    this.quantity--;
    this.onChange(this.quantity) // update the FormControl, when value changes
  }

}
