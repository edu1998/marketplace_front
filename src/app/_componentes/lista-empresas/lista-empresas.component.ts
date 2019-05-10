import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { EmpresaService } from 'src/app/_servicios/empresa/empresa.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-empresas',
  templateUrl: './lista-empresas.component.html',
  styleUrls: ['./lista-empresas.component.css']
})
export class ListaEmpresasComponent implements OnInit {

  @Input('direccionFilter') direccionFilter: string;
  @Input('redirect') redirect: boolean; //si se debe enviar el parametro por la url o por un ouput
  @Output('idEmpresa') idEmpresa = new EventEmitter<any>();

  constructor(
    private _empresaSer: EmpresaService,
    private router: Router
  ) { }

  listEmpresas: Observable<any>

  getEmpresaDireccion() {
    this.listEmpresas = this._empresaSer.getEmprsaDireccion(this.direccionFilter);
  }

  formatDias(dias): string {
    let diasDisponible = []
    for (const dia in dias) {
      if (dias[dia] === true) {
        diasDisponible.push(dia)
      }
    }
    return diasDisponible.sort(this.daysOfWeekSorter).join(', ')
  }

  daysOfWeekSorter(x, y) {
    const daysOfWeek = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"]
    return daysOfWeek.indexOf(x) - daysOfWeek.indexOf(y);
  }

  redireccion(idEmpresa) {
    this.router.navigate(['/cliente/agendar-cita', idEmpresa]);
    this.idEmpresa.emit('salir')
  }
  salidaOutput(idEmpresa) {
    this.idEmpresa.emit(idEmpresa)
  }

  ngOnInit() {
    this.getEmpresaDireccion();
  }

}
