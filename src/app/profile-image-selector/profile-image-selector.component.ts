import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const IMAGE_SELECTOR_PROVIDER={
  provide:NG_VALUE_ACCESSOR,
  useExisting:forwardRef(()=>ProfileImageSelectorComponent),
  multi:true
}

@Component({
  selector: 'profile-image-selector',
  templateUrl: './profile-image-selector.component.html',
  styleUrls: ['./profile-image-selector.component.scss'],
  providers:[IMAGE_SELECTOR_PROVIDER]
})
export class ProfileImageSelectorComponent implements ControlValueAccessor {

  @Input('imageList')imageList:string[]=[];

  selectedImage:string="";
  onTouched!:Function;
  onChange!:Function;


  writeValue(image:string): void {
    //Changes in the parent form control is updated to selectedImage
    this.selectedImage=image;
  }
  registerOnChange(fn:Function): void {
    //changes in selectedImage are propagated to the parent form control
    this.onChange=(image:string)=>{
      fn(image)
    }
  }
  registerOnTouched(fn: Function): void {
     this.onTouched=fn;
  }
  
  selectImage(image:string){
    this.selectedImage=image;
    this.onChange(image); //call this to propagate the changes to parent form control
  }

  resetSelection(){
    this.selectedImage=""; //call this to propagate the changes to parent form control
    this.onChange(this.selectedImage);
  }

}
