import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import {  
     
    LoginGuardGuard,
    AdminGuard, 
    VerificaTokenGuard,
   
} from './services.index'

@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      HttpClientModule
    ],
    providers:[
    
      LoginGuardGuard,
      AdminGuard,
      VerificaTokenGuard,
    ]
  })
  export class ServicesModule { }
  