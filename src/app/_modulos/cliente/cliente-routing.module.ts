import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavClienteComponent } from '../../_componentes/nav-cliente/nav-cliente.component'

const routes: Routes = [
  {
    path: '',
    component: NavClienteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
