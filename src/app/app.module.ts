import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DateValueAccessorDirective } from './date-value-accessor.directive';
import { QuantityControlComponent } from './quantity-control/quantity-control.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileImageSelectorComponent } from './profile-image-selector/profile-image-selector.component';
import { CustomAddressComponent } from './custom-address/custom-address.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AppData } from './services/app.data';
import { ContactFormComponent } from './contact-form/contact-form.component';

@NgModule({
  declarations: [
    AppComponent,
    DateValueAccessorDirective,
    QuantityControlComponent,
    ProfileImageSelectorComponent,
    CustomAddressComponent,
    ContactFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(AppData),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
