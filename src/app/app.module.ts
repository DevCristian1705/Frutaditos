import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MockApiModule } from './auth/mock-api/mock-api.module';
import { AuthMockApi } from './auth/mock-api/api';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AuthService } from './auth/service/auth.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MockApiModule.forRoot([AuthMockApi]),
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }, 
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
