import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavClienteComponent } from '../../_componentes/nav-cliente/nav-cliente.component'
import { EditarClienteComponent } from '../../_componentes/editar-cliente/editar-cliente.component';
import { AgendarCitaClienteComponent } from '../../_componentes/agendar-cita-cliente/agendar-cita-cliente.component';
import { ListaCitasClientesComponent } from '../../_componentes/lista-citas-clientes/lista-citas-clientes.component';

const routes: Routes = [
  {
    path: '',
    component: NavClienteComponent,
    children: [
      {
        path: 'editar',
        component: EditarClienteComponent
      },
      {
        path: 'agendar-cita',
        component: AgendarCitaClienteComponent
      },
      {
        path: 'agendar-cita/:idEmpresa',
        component: AgendarCitaClienteComponent
      },
      {
        path: 'lista-citas',
        component: ListaCitasClientesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
