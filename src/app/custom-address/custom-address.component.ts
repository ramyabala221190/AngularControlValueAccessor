import { Component, forwardRef } from '@angular/core';
import { AbstractControl, ControlValueAccessor, Form, FormArray, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator, Validators } from '@angular/forms';
import { AddressModel } from '../models';
import { Subject, debounceTime, takeUntil } from 'rxjs';

@Component({
  selector: 'app-custom-address',
  templateUrl: './custom-address.component.html',
  styleUrls: ['./custom-address.component.scss'],
  providers:[{
    provide:NG_VALUE_ACCESSOR,
    useExisting:forwardRef(()=>CustomAddressComponent),
    multi:true
  },{
    provide:NG_VALIDATORS,
    useExisting:forwardRef(()=>CustomAddressComponent),
    multi:true
  }]
})
export class CustomAddressComponent implements ControlValueAccessor,Validator {
  
  constructor(private fb:FormBuilder){}
 
  addressForm:FormGroup=this.fb.group({
      addressLineList:this.fb.array([])
  });

  protected onTouched!:()=>void;
  private destroy$=new Subject<boolean>();

  get addressControls(){
    return (<FormArray>this.addressForm.get('addressLineList')).controls;
  }

  //lifecycle methods
  
  ngOnDestroy(){
    //destroy any active subscriptions
    this.destroy$.next(true);
    this.destroy$.complete();
  }

 
  //ControlValueAccessor methods

  writeValue(addresses:AddressModel[]): void {
    console.log("writeValue");
    this.addressForm.setControl('addressLineList', this.fb.array(addresses.map(addr=>this.loadSingleAddress(addr))),{emitEvent:false})
  }
  registerOnChange(fn: (value:AddressModel[])=>void): void {
    this.addressForm.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((address:{addressLineList:AddressModel[]})=>{
      console.log(address.addressLineList)
      console.log("registerOnChange: callback function called")
      fn(address.addressLineList)
    });
  }
  registerOnTouched(fn: ()=>void): void {
    this.onTouched=()=>{
      console.log("registerOnTouched: callback function called")
      fn();
    }
  }

  setDisabledState(isDisabled: boolean): void { 
    //optional method. Can be removed if no requirement to implement
  }


  //Validator interface methods

  registerOnValidatorChange(fn: () => void): void {
    //optional method. Can be removed if no requirement to implement
  }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return this.addressForm.valid ? null : {"error":true}
  }

  // Setting up the form

  removeAddress(addressIndex:number){
    (<FormArray>this.addressForm.get('addressLineList')).removeAt(addressIndex)
  }


  loadSingleAddress(addr:AddressModel){
    return this.fb.group({
      street:[addr.street,[Validators.required]],
      suite:[addr.suite,[Validators.required]],
      city:[addr.city,[Validators.required]],
      zipcode:[addr.zipcode,[Validators.required]]
    })
  }

  addAddress(){
    (<FormArray>this.addressForm.get('addressLineList')).push(
      this.loadSingleAddress({street:"",suite:"",city:"",zipcode:""})
      )
  }

}
