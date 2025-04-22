import { Component, forwardRef } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormArray, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { Phone } from '../models';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-custom-phone',
  templateUrl: './custom-phone.component.html',
  styleUrls: ['./custom-phone.component.scss'],
  providers:[{
    provide:NG_VALUE_ACCESSOR,
    useExisting:forwardRef(()=>CustomPhoneComponent),
    multi:true
  },{
    provide:NG_VALIDATORS,
    useExisting:forwardRef(()=>CustomPhoneComponent),
    multi:true
  }]
})
export class CustomPhoneComponent implements ControlValueAccessor,Validator {

  constructor(private fb:FormBuilder){}

  phoneTypeList:string[]=["home","work","other"];
  protected onTouched!:()=>void;
  private destroy$=new Subject<boolean>();

  phoneForm:FormGroup=this.fb.group({
    phoneList:this.fb.array([])
  })

  get phoneListControls(){
    return (<FormArray>this.phoneForm.get('phoneList')).controls;
  }


  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  //ControlValueAccessor interface methods
  writeValue(phoneList:Phone[]): void {
    console.log("writeValue");
    this.phoneForm.setControl('phoneList',this.fb.array(phoneList.map(phone=>this.createPhoneGroup(phone))))
  }
  registerOnChange(fn: (value:Phone[])=>void): void {
   
    this.phoneForm.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((result:{phoneList:Phone[]})=>{
      console.log("registerOnChange callback function called");
      fn(result.phoneList);
    })
  }
  registerOnTouched(fn: ()=>void): void {
    this.onTouched=()=>{
      console.log("registerOnTouched callback function called");
      fn();
    }
  }
  setDisabledState?(isDisabled: boolean): void {
        //optional method. Can be removed if no requirement to implement
  }

  //Validator interface methods

  registerOnValidatorChange(fn: () => void): void {
        //optional method. Can be removed if no requirement to implement
  }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return this.phoneForm.valid ? null : {"errors":true}
 }

  //Setting up form 

  removePhone(phoneIndex:number){
    (<FormArray>this.phoneForm.get('phoneList')).removeAt(phoneIndex);
  }

  createPhoneGroup(phone:Phone){
      return this.fb.group({
      phoneNumber:new FormControl(phone.phoneNumber),
      phoneType:new FormControl(phone.phoneType),
      preferred:new FormControl(phone.preferred)
    },{validators:phoneGroupValidator}) //if preferred is checked, then phoneNumber must not be blank

  }

   addPhone(){
    (<FormArray>this.phoneForm.get('phoneList')).push(this.createPhoneGroup({
      phoneNumber:"",
      preferred:false,
      phoneType:""
    }))
  }


}

 export function phoneGroupValidator(control:AbstractControl):ValidationErrors|null{
   if(control.get('preferred')?.value){
    return (control.get('phoneNumber')?.value.length && control.get('phoneType')?.value.length) ? null: {required:"Preferred Phone number and Type is required"}
   }
   else{
    return control.get('phoneNumber')?.value.length ? null : {required: "Phone Number is required"}
   }
}
