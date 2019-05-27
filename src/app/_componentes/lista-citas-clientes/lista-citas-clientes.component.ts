import { Component, OnInit } from '@angular/core';
import { CitasService } from 'src/app/_servicios/citas/citas.service';
import {idEmpresOCliente} from '../../_servicios/shared-function.service'
import { Subscription, Observable } from 'rxjs';
@Component({
  selector: 'app-lista-citas-clientes',
  templateUrl: './lista-citas-clientes.component.html',
  styleUrls: ['./lista-citas-clientes.component.css']
})
export class ListaCitasClientesComponent implements OnInit {

  constructor(
    private citasService : CitasService
  ) { }

  public obsCitasCLiente : Observable<any>

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  ngOnInit() {
    this.obsCitasCLiente = this.citasService.getCitasCliente(idEmpresOCliente())
  }

}
