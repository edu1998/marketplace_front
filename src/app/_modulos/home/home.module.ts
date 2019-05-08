import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { MaterialModule } from '../material/material.module'

import { HomeComponent } from '../../_componentes/home/home.component'

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
  ],
  bootstrap: [HomeComponent]
})
export class HomeModule { }
