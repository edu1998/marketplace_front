import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmpresaService } from 'src/app/_servicios/empresa/empresa.service';
import { Observable } from 'rxjs';
import { MatCheckbox, MatCheckboxChange } from '@angular/material';

@Component({
  selector: 'app-agendar-cita-cliente',
  templateUrl: './agendar-cita-cliente.component.html',
  styleUrls: ['./agendar-cita-cliente.component.css']
})
export class AgendarCitaClienteComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private empresaSer: EmpresaService
  ) {
    this.idEmpresa = this.route.params['value'].idEmpresa;
  }

  idEmpresa: number;
  serviciosObservable: Observable<any>;
  serviciosAgragados: Array<any>;

  GetIdEmpresa(idEmpresa) {
    this.idEmpresa = idEmpresa;
    this.getServicios();
  }

  getServicios() {
    this.serviciosObservable = this.empresaSer.getServicios(this.idEmpresa)
  }
  selectServices(servcio: MatCheckboxChange) {
    if (servcio.checked) {
      if (!this.serviciosAgragados.length) {
        this.serviciosAgragados.push(servcio.source.value)
      } else {
        const result = this.serviciosAgragados.filter(ser => ser.id === servcio.source.value['id']);
        if (!result.length) {
          this.serviciosAgragados.push(servcio.source.value)
        }
      }
    } else {
      for (let i = 0; i < this.serviciosAgragados.length; i++) {
        if (this.serviciosAgragados[i].id === servcio.source.value['id']) {
          console.log([this.serviciosAgragados[i].id, servcio.source.value['id']]);
          this.serviciosAgragados.splice(i, 1)
          break
        }
      }

    }
  }

  ngOnInit() {
    localStorage.removeItem('urlcita');
    this.serviciosAgragados = [];
    (this.idEmpresa) ? this.getServicios() : null;
  }

}
