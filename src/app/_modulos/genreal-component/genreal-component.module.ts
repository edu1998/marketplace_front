import { AgendarCitaComponent } from './../../_componentes/agendar-cita/agendar-cita.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { FullCalendarModule } from '@fullcalendar/angular';

import { ListaEmpresasComponent } from '../../_componentes/lista-empresas/lista-empresas.component';
import { ElegirServiciosComponent, empleadosServicios } from '../../_componentes/elegir-servicios/elegir-servicios.component';


@NgModule({
  declarations: [
    ListaEmpresasComponent,
    AgendarCitaComponent,
    ElegirServiciosComponent,
    empleadosServicios
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FullCalendarModule
  ],
  exports: [
    ListaEmpresasComponent,
    AgendarCitaComponent,
    ElegirServiciosComponent
  ],
  entryComponents: [
    ElegirServiciosComponent,
    empleadosServicios
  ]
})
export class GenrealComponentModule { }
