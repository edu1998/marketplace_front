import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavClienteComponent } from '../../_componentes/nav-cliente/nav-cliente.component'
import { EditarClienteComponent } from '../../_componentes/editar-cliente/editar-cliente.component';

const routes: Routes = [
  {
    path: '',
    component: NavClienteComponent,
    children: [
      {
        path: 'editar',
        component: EditarClienteComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
