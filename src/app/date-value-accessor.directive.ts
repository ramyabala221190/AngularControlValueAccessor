import { Directive, ElementRef, HostListener, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const DATE_VALUE_PROVIDER={
  provide:NG_VALUE_ACCESSOR,
  useExisting:forwardRef(()=>DateValueAccessorDirective),
  multi:true
}

@Directive({
  selector: 'input[type=date][formControlName],input[type=date][formControl],input[type=date][ngModel]',
  providers:[DATE_VALUE_PROVIDER]
})
export class DateValueAccessorDirective implements ControlValueAccessor {

  /**
   * ControlValueAccessor is responsible for updating a html element's value when its bound form control
   * changes and vice-versa.
   */

  constructor(private element:ElementRef) { }

  @HostListener('input', ['$event.target.valueAsDate'])
  private onChange!: Function;

  @HostListener('blur', ['$event.target.valueAsDate'])
  private onTouched!: Function;
  
  
  writeValue(newValue:any): void {
    //called whenever the bound FormControl value changes. It will update the html element value.
    if(newValue instanceof Date){
      console.log(newValue);
    this.element.nativeElement.value=newValue.toISOString().split('T')[0];
    }
  }
  registerOnChange(fn: Function): void {
    this.onChange =(valueAsDate:Date)=>{ fn(valueAsDate)}
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  

}
