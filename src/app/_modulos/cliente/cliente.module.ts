import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';

import { NavClienteComponent } from '../../_componentes/nav-cliente/nav-cliente.component'
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    NavClienteComponent
  ],
  imports: [
    CommonModule,
    ClienteRoutingModule,
    MaterialModule,
  ],
  providers: [
  ]
})
export class ClienteModule { }
