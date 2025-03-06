import { Component, forwardRef } from '@angular/core';
import { AbstractControl, ControlValueAccessor, Form, FormArray, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AddressModel } from '../models';

const ADDRESS_LINE_PROVIDER={
  provide:NG_VALUE_ACCESSOR,
  useExisting:forwardRef(()=>CustomAddressComponent),
  multi:true
}


@Component({
  selector: 'app-custom-address',
  templateUrl: './custom-address.component.html',
  styleUrls: ['./custom-address.component.scss'],
  providers:[ADDRESS_LINE_PROVIDER]
})
export class CustomAddressComponent implements ControlValueAccessor {
  

  addressForm!:FormGroup;
  onTouched!:Function;

  writeValue(addresses:AddressModel[]): void {
        //Update the value of child form when parent FormControl changes
    addresses.forEach(addr=>{
      (<FormArray>this.addressForm.get('addressLineList')).push(this.loadSingleAddress(addr));
    })
  }
  registerOnChange(fn: Function): void {
        //update the parent FormControl, when value of child form changes
    this.addressForm.valueChanges.subscribe(address=>{
      fn(address.addressLineList)
    });
  }
  registerOnTouched(fn: Function): void {
    this.onTouched=fn;
  }

  get addressControls(){
    return (<FormArray>this.addressForm.get('addressLineList')).controls;
  }


  ngOnInit(){
    this.addressForm=new FormGroup({
      addressLineList:new FormArray([])
    })

   
  }

  loadSingleAddress(addr:AddressModel){
    return new FormGroup({
      street:new FormControl(addr.street),
      suite:new FormControl(addr.suite),
      city:new FormControl(addr.city),
      zipcode:new FormControl(addr.zipcode),
    })
  }

  addAddress(){
    (<FormArray>this.addressForm.get('addressLineList')).push(this.loadSingleAddress(
      {
        street:"",
        suite:"",
        city:"",
        zipcode:""
      }
    ))
  }

}
