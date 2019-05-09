import { AgendarCitaComponent } from './../../_componentes/agendar-cita/agendar-cita.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { FullCalendarModule } from '@fullcalendar/angular';

import { ListaEmpresasComponent } from 'src/app/_componentes/lista-empresas/lista-empresas.component';


@NgModule({
  declarations: [
    ListaEmpresasComponent,
    AgendarCitaComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FullCalendarModule
  ],
  exports: [
    ListaEmpresasComponent,
    AgendarCitaComponent
  ]
})
export class GenrealComponentModule { }
