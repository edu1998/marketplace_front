import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { MaterialModule } from '../material/material.module'

import { HomeComponent, ListaEmpresa } from '../../_componentes/home/home.component'
import { GenrealComponentModule } from '../genreal-component/genreal-component.module';

@NgModule({
  declarations: [
    HomeComponent,
    ListaEmpresa
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    GenrealComponentModule
  ],
  entryComponents: [HomeComponent, ListaEmpresa],
  bootstrap: [HomeComponent]
})
export class HomeModule { }
