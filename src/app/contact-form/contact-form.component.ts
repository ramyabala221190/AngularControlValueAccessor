import { Component } from '@angular/core';
import { FormGroup, FormControl, FormArray, AbstractControl, ValidationErrors } from '@angular/forms';
import { tap } from 'rxjs';
import { Phone, UserModel } from '../models';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent {
  constructor(private dataService:DataService){}

  userForm!:FormGroup;
  quantity!:FormControl;

  phoneTypeList:string[]=["home","work","other"]

  imageList :string[]=[
    'batman.png',
    'blackpanther.png',
    'captainamerica.png',
    'captainmarvel.png',
    'flash.png',
    'greenlantern.png',
    'ironman.png',
    'spiderman.png',
    'superman.png',
    'thor.png',
    'wonderwoman.png'
        ]

  get userControls(){
    return (<FormArray>this.userForm.get('userList')).controls;
  }

  getPhoneControls(userIndex:number){
    return (<FormArray>(<FormArray>this.userForm.get('userList')).at(userIndex).get('phone')).controls;
  }

  stringifyCompare(a:unknown,b:unknown){
    return JSON.stringify(a) === JSON.stringify(b)
  }

  ngOnInit(){

    this.quantity=new FormControl(0);

    this.userForm=new FormGroup({
      userList:new FormArray([])
    })

    this.getUsers();
  }

  createPhoneGroup(phone:Phone){
      return new FormGroup({
      phoneNumber:new FormControl(phone.phoneNumber),
      phoneType:new FormControl(phone.phoneType),
      preferred:new FormControl(phone.preferred)
    },{validators:phoneGroupValidator}) //if preferred is checked, then phoneNumber must not be blank

  }

  resetQuantity(){
    this.userForm.get('favourite')?.patchValue(0);
  }

  addPhone(userIndex:number){
    (<FormArray>(<FormArray>this.userForm.get('userList')).at(userIndex).get('phone')).push(this.createPhoneGroup({
      phoneNumber:"",
      preferred:false,
      phoneType:""
    }))
  }

  createUserGroup(user:UserModel){
    return new FormGroup({
      id:new FormControl(user.id),
      name:new FormControl(user.name),
      dob:new FormControl(user.dob),
      email:new FormControl(user.email),
      address:new FormControl(user.address),
      phone:new FormArray(user.phone.map(ph=>this.createPhoneGroup(ph))),
      website:new FormControl(user.website),
      favourite:new FormControl(user.favourite),
      profile:new FormControl(user.profile)
    })
  }

  getUsers(){
    (<FormArray>this.userForm.get('userList')).clear();
    this.dataService.getUsers().pipe().subscribe(
      (result:UserModel[])=>{
          result.forEach((user:UserModel)=>{
            (<FormArray>this.userForm.get('userList')).push(this.createUserGroup(user))
          })
      }
     )
  }

  updateUser(userIndex:number){
    let user=(<FormArray>this.userForm.get('userList')).at(userIndex).value;
    this.dataService.updateUser(user,user.id).pipe(
      tap(()=>{
         this.getUsers();
      })
    ).subscribe();
  }

  
}

export function phoneGroupValidator(control:AbstractControl):ValidationErrors|null{
   if(control.get('preferred')?.value){
    return control.get('phoneNumber')?.value.length ? null: {required:"Phone number is required"}
   }
   else{
    return null;
   }
}


