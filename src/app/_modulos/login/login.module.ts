import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from '../../_componentes/login/login.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MaterialModule
  ],
  bootstrap: [LoginComponent]
})
export class LoginModule { }
