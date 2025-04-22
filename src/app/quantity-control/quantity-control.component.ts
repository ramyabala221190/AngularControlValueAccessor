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

  private onChange!:(value:number)=>void;
  private onTouched!:()=>void;
  quantity:number=0;
  disableAction:boolean=false;
  
  writeValue(qty:number): void {
    console.log("writeValue called");
    this.quantity=qty;
  }
  registerOnChange(fn: (value:number)=>void): void {
    this.onChange=(qty:number)=>{
      console.log("registerOnChange: callback function called")
      fn(qty);
    }
  }
  registerOnTouched(fn: ()=>void): void {
    this.onTouched=()=>{
      console.log("registerOnTouched: callback function called")
      fn();
    }
  }

  setDisabledState(isDisabled:boolean){
    this.disableAction=isDisabled;
  }
  
  addQuantity(){
    this.quantity++;
    this.onChange(this.quantity);
    this.onTouched();
  }

  removeQuantity(){
    this.quantity--;
    this.onChange(this.quantity);
    this.onTouched();
  }

}
