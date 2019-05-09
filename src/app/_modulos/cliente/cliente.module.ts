import { GenrealComponentModule } from './../genreal-component/genreal-component.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { MaterialModule } from '../material/material.module';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ClienteFormModel } from 'src/app/_formModel/cliente.form-model';

import { NavClienteComponent } from '../../_componentes/nav-cliente/nav-cliente.component'
import { EditarClienteComponent } from '../../_componentes/editar-cliente/editar-cliente.component';
import { AgendarCitaClienteComponent } from '../../_componentes/agendar-cita-cliente/agendar-cita-cliente.component';

@NgModule({
  declarations: [
    NavClienteComponent,
    EditarClienteComponent,
    AgendarCitaClienteComponent
  ],
  imports: [
    CommonModule,
    ClienteRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule,
    GenrealComponentModule
  ],
  providers: [
    ClienteFormModel
  ]
})
export class ClienteModule { }
