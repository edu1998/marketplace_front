import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpresaRoutingModule } from './empresa-routing.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NavEmpresaComponent } from '../../_componentes/nav-empresa/nav-empresa.component';
import { EditarEmpresaComponent } from '../../_componentes/editar-empresa/editar-empresa.component'
import { EmpresaFormModel } from 'src/app/_formModel/empresa.form-model';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { AgendarCitaEmpresComponent } from '../../_componentes/agendar-cita-empres/agendar-cita-empres.component';
import { GenrealComponentModule } from '../genreal-component/genreal-component.module';
import { ListaCitaEmpresComponent, InfoCita } from '../../_componentes/lista-cita-empres/lista-cita-empres.component';

@NgModule({
  declarations: [
    NavEmpresaComponent,
    EditarEmpresaComponent,
    AgendarCitaEmpresComponent,
    ListaCitaEmpresComponent,
    InfoCita
  ],
  imports: [
    CommonModule,
    EmpresaRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule,
    GenrealComponentModule
  ],
  entryComponents: [
    InfoCita,
    ListaCitaEmpresComponent
  ],
  providers: [
    EmpresaFormModel,
  ]
})
export class EmpresaModule { }
