import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NavEmpresaComponent } from '../../_componentes/nav-empresa/nav-empresa.component'
import { EditarEmpresaComponent } from '../../_componentes/editar-empresa/editar-empresa.component'

const routes: Routes = [
  {
    path: '',
    component: NavEmpresaComponent,
    children: [
      {
        path: 'editar',
        component: EditarEmpresaComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpresaRoutingModule { }
