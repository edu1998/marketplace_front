import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistroEmpresaComponent } from '../../_componentes/registro-empresa/registro-empresa.component'
import { RegistroClienteComponent } from '../../_componentes/registro-cliente/registro-cliente.component'

const routes: Routes = [
  {
    path: 'empresa',
    component: RegistroEmpresaComponent
  },
  {
    path: 'cliente',
    component: RegistroClienteComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistroRoutingModule { }
