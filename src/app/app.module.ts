import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DateValueAccessorDirective } from './date-value-accessor.directive';
import { QuantityControlComponent } from './quantity-control/quantity-control.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileImageSelectorComponent } from './profile-image-selector/profile-image-selector.component';
import { CustomAddressComponent } from './custom-address/custom-address.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AppData } from './services/app.data';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CustomPhoneComponent } from './custom-phone/custom-phone.component';

@NgModule({
  declarations: [
    AppComponent,
    DateValueAccessorDirective,
    QuantityControlComponent,
    ProfileImageSelectorComponent,
    CustomAddressComponent,
    ContactFormComponent,
    ShoppingCartComponent,
    CustomPhoneComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    HttpClientInMemoryWebApiModule.forRoot(AppData),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
