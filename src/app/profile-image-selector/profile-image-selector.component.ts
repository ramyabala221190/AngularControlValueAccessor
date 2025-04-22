import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'profile-image-selector',
  templateUrl: './profile-image-selector.component.html',
  styleUrls: ['./profile-image-selector.component.scss'],
  providers:[{
    provide:NG_VALUE_ACCESSOR,
    useExisting:forwardRef(()=>ProfileImageSelectorComponent),
    multi:true
  }]
})
export class ProfileImageSelectorComponent implements ControlValueAccessor {

  @Input('imageList')imageList:string[]=[];

  selectedImage:string="";
  onTouched!:()=>void;
  onChange!:(value:string)=>void;


  writeValue(image:string): void {
    console.log("writeValue",image);
    this.selectedImage=image;
  }
  registerOnChange(fn:(value:string)=>void): void {
    this.onChange=(image:string)=>{
      console.log("registerOnChange callback function called")
      fn(image)
    }
  }
  registerOnTouched(fn: ()=>void): void {
     this.onTouched=()=>{
      console.log("registerOnTouched callback function called")
        fn();
     }
  }

  setDisabledState(isDisabled: boolean): void {
    //optional method. If not implemented, can be removed
  }
  
  selectImage(image:string){
    this.selectedImage=image;
    this.onChange(image); 
    this.onTouched();
  }

  resetSelection(){
    this.selectedImage="";
    this.onChange(this.selectedImage);
    this.onTouched();
  }

}
