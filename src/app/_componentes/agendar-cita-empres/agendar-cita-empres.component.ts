import { Component, OnInit } from '@angular/core';
import { EmpresaService } from 'src/app/_servicios/empresa/empresa.service';
import { Observable } from 'rxjs';
import { MatCheckboxChange } from '@angular/material';
import { idEmpresOCliente } from '../../_servicios/shared-function.service'
import { ClienteService } from 'src/app/_servicios/cliente/cliente.service';

@Component({
  selector: 'app-agendar-cita-empres',
  templateUrl: './agendar-cita-empres.component.html',
  styleUrls: ['./agendar-cita-empres.component.css']
})
export class AgendarCitaEmpresComponent implements OnInit {

  constructor(
    private empresaSer: EmpresaService,
    private clienteSer: ClienteService
  ) {
    this.idEmpresa = idEmpresOCliente();
  }

  serviciosObservable: Observable<any>;
  serviciosAgragados: Array<any>;
  docCliente: string;
  idEmpresa: any;
  idCliente: number

  getServicios() {
    this.serviciosObservable = this.empresaSer.getServicios(idEmpresOCliente())
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
          this.serviciosAgragados.splice(i, 1)
          break
        }
      }

    }
  }

  getCliente() {
    console.log(this.docCliente);
    
    this.clienteSer.getCLiente(this.docCliente).subscribe(data => {
      console.log(data);
      
      this.idCliente = (data) ? data.id : null;
    })
  }

  ngOnInit() {
    localStorage.removeItem('urlcita');
    this.serviciosAgragados = [];
    this.getServicios();
  }

}
