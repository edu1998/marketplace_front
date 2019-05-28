import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NavEmpresaComponent } from '../../_componentes/nav-empresa/nav-empresa.component'
import { EditarEmpresaComponent } from '../../_componentes/editar-empresa/editar-empresa.component'
import { AgendarCitaEmpresComponent } from '../../_componentes/agendar-cita-empres/agendar-cita-empres.component'
import { ListaCitaEmpresComponent } from 'src/app/_componentes/lista-cita-empres/lista-cita-empres.component';
const routes: Routes = [
  {
    path: '',
    component: NavEmpresaComponent,
    children: [
      {
        path: 'editar',
        component: EditarEmpresaComponent
      },
      {
        path: 'agendar-cita',
        component: AgendarCitaEmpresComponent
      },
      {
        path: 'lista-citas',
        component: ListaCitaEmpresComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpresaRoutingModule { }
