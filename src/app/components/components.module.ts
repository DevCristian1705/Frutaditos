import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';
import { ListaComponent } from './lista/lista.component';
import { LandingComponent } from './landing/landing.component';
import { MaterialModule } from '../shared/material/material.module';
import { SharedModule } from '../shared/shared.module'; 
import { AgregarPostComponent } from './lista/agregar-post/agregar-post.component';  


@NgModule({
  declarations: [
    ListaComponent,
    LandingComponent,
    AgregarPostComponent
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule, 
    SharedModule,
    MaterialModule
  ], 
})
export class ComponentsModule { }
