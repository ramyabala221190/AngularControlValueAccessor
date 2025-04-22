import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, UserModel } from '../models';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  baseUrl:string="app";

  getUsers():Observable<UserModel[]>{
    return this.http.get<UserModel[]>(`${this.baseUrl}/users`);
  }

  updateUser(updatedUser:Partial<UserModel>,userId:number){
    return this.http.put(`${this.baseUrl}/users?id=${userId}`,updatedUser)
  }

  getProducts():Observable<Product[]>{
    return this.http.get<Product[]>(`${this.baseUrl}/products`);
  }
}
