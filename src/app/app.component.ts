import { Component } from '@angular/core';
import { AbstractControl, Form, FormArray, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { DataService } from './services/data.service';
import { Phone, UserModel } from './models';
import { distinctUntilChanged, iif, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {}

 