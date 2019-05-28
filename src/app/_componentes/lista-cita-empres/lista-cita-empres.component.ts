import { Component, OnInit } from '@angular/core';
import { CitasService } from 'src/app/_servicios/citas/citas.service';
import { Observable } from 'rxjs';
import { idEmpresOCliente } from '../../_servicios/shared-function.service'

@Component({
  selector: 'app-lista-cita-empres',
  templateUrl: './lista-cita-empres.component.html',
  styleUrls: ['./lista-cita-empres.component.css']
})
export class ListaCitaEmpresComponent implements OnInit {

  constructor(
    private citasService: CitasService
  ) { }

  public obsCitasEmpresa: Observable<any>

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  ngOnInit() {
    this.obsCitasEmpresa = this.citasService.getCitasEmpresa(idEmpresOCliente())
  }

}
