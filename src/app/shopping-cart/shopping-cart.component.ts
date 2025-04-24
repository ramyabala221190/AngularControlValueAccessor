import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { Observable, tap } from 'rxjs';
import { Product } from '../models';
import { AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent {

  constructor(private dataService:DataService){}

  get productList(){
    return (<FormArray>this.cartForm.get('products')).controls;
  }

  cartForm:FormGroup=new FormGroup({
    products:new FormArray([])
  }
  )

  ngOnInit(){
     this.dataService.getProducts().pipe(
      tap((products:Product[])=>{
        products.forEach((product:Product)=>{
          (<FormArray>this.cartForm.get('products')).push(this.createProductGroup(product))
        })
        console.log((<FormArray>this.cartForm.get('products')).controls);
      })
      ).subscribe();
  }

  submit(){
    console.log(this.cartForm.value);
    console.log((<FormArray>this.cartForm.get('products')).controls);
  }

  createProductGroup(product:Product){
    return new FormGroup({
      id:new FormControl(product.id),
      name: new FormControl(product.title),
      price:new FormControl(product.price),
      description:new FormControl(product.description),
      brand: new FormControl(product.brand),
      rating: new FormControl(product.rating),
      stock:new FormControl(product.stock),
      quantity:new FormControl({value:product.quantity,disabled:product.stock == 0})
    })
  }

}

