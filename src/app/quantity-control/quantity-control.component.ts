import { Component, Input, forwardRef } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';


@Component({
  selector: 'app-quantity-control',
  templateUrl: './quantity-control.component.html',
  styleUrls: ['./quantity-control.component.scss'],
  providers:[{
    provide:NG_VALUE_ACCESSOR,
    useExisting:forwardRef(()=>QuantityControlComponent),
    multi:true
  },
{
  provide:NG_VALIDATORS,
  useExisting:forwardRef(()=>QuantityControlComponent),
  multi:true
}]
})
export class QuantityControlComponent implements ControlValueAccessor,Validator {
  
  private onChange!:(value:number)=>void;
  private onTouched!:()=>void;
  quantity:number=0;
  disableAction:boolean=false;

  //ControlValueAccessor interface methods
  
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

  //Validator interface methods

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return this.quantity == 0 ? {"errors":"Product quantity is 0"}:null;
  }

  registerOnValidatorChange?(fn: () => void): void {
    //optional method. if not implemented, can be removed
  }


  //Add or remove quantity
  
  addQuantity(){
    this.quantity++;
    this.onChange(this.quantity);
    this.onTouched();
  }

  removeQuantity(){
    if(this.quantity > 0){
    this.quantity--;
    this.onChange(this.quantity);
    }
    this.onTouched();
  }
}
