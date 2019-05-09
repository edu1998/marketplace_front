import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { MaterialModule } from '../material/material.module';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ClienteFormModel } from 'src/app/_formModel/cliente.form-model';

import { NavClienteComponent } from '../../_componentes/nav-cliente/nav-cliente.component'
import { EditarClienteComponent } from '../../_componentes/editar-cliente/editar-cliente.component';

@NgModule({
  declarations: [
    NavClienteComponent,
    EditarClienteComponent
  ],
  imports: [
    CommonModule,
    ClienteRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule
  ],
  providers: [
    ClienteFormModel
  ]
})
export class ClienteModule { }
