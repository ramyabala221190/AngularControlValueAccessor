import { Component } from '@angular/core';
import { FormGroup, FormControl, FormArray, AbstractControl, ValidationErrors, Validators, FormBuilder, Form } from '@angular/forms';
import { mergeMap, tap } from 'rxjs';
import { Phone, UserModel } from '../models';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent {
  constructor(private dataService:DataService,private fb:FormBuilder){}

  userForm!:FormGroup;

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

  // stringifyCompare(a:unknown,b:unknown){
  //   return JSON.stringify(a) === JSON.stringify(b)
  // }

  ngOnInit(){

    this.userForm=this.fb.group({
      userList:this.fb.array([])
    })

    this.getUsers().subscribe();
  }

  
  resetQuantity(){
    this.userForm.get('favourite')?.patchValue(0);
  }

  createUserGroup(user:UserModel){
    return this.fb.group({
      id:[user.id],
      name:[user.name,[Validators.required]],
      dob:[user.dob,[Validators.required]],
      email:[user.email,[Validators.required,Validators.email]],
      address:[user.address],
      phone:[user.phone],
      website:[user.website,[Validators.required]],
      favourite:[user.favourite,[Validators.required]],
      profile:[user.profile,[Validators.required]]
    })
  }

  getUsers(){
    (<FormArray>this.userForm.get('userList')).clear();
    return this.dataService.getUsers().pipe(
      tap((users:UserModel[])=>{
        this.userForm.setControl('userList',this.fb.array(users.map(user=>this.createUserGroup(user))))

      })
    )
  }

  updateUser(userIndex:number){
    console.log(this.userForm.value)
    let user=(<FormArray>this.userForm.get('userList')).at(userIndex).getRawValue();
    this.dataService.updateUser(user,user.id).pipe(mergeMap(()=>this.getUsers())).subscribe();
  }

  
}



