import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component'; 
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/material/material.module';
 
@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    MaterialModule
  ],
 
})
export class AuthModule { }
