import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../models';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  baseUrl:string="app/users";

  getUsers():Observable<UserModel[]>{
    return this.http.get<UserModel[]>(this.baseUrl);
  }

  updateUser(updatedUser:Partial<UserModel>,userId:number){
    return this.http.put(`${this.baseUrl}?id=${userId}`,updatedUser)
  }
}
