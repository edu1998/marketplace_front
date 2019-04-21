import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';


import { RegistroRoutingModule } from './registro-routing.module';
import { RegistroClienteComponent } from '../../_componentes/registro-cliente/registro-cliente.component'
import { RegistroEmpresaComponent } from '../../_componentes/registro-empresa/registro-empresa.component';
import { EmpresaFormModel } from '../../_formModel/empresa.form-model'
import { SharedFunctionService } from 'src/app/_servicios/shared-function.service';

@NgModule({
  declarations: [
    RegistroEmpresaComponent,
    RegistroClienteComponent
  ],
  imports: [
    MaterialModule,
    CommonModule,
    RegistroRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule
  ],
  providers: [
    EmpresaFormModel,
    SharedFunctionService
  ]
})
export class RegistroModule { }
