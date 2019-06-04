import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment'
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { iteratorToArray } from '@angular/animations/browser/src/util';

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  constructor(private Http: HttpClient) { }

  getCitasAgendadas(idEmpresa) {
    return this.Http.get(`${environment.url_api}citas/CitasAgendadas/${idEmpresa}`).pipe(
      map((data: any) => {
        let result = []
        for (const iterator of data) {

          iterator.start = moment(iterator.fecha).format('YYYY-MM-DDTHH:mm:ss');

          let totalEnd = 0
          for (const service of iterator.servicios) {
            totalEnd = totalEnd + service.duracion_minutos,
            console.log(totalEnd);
          }

          const end = moment(iterator.start).add(totalEnd, 'm');
          console.log(end.format('YYYY-MM-DDTHH:mm:ss'));
          
          result.push({
            title: 'Ocupado',
            start: iterator.start,
            backgroundColor: '#d62121',
            color: '#d62121',
            end: end.format('YYYY-MM-DDTHH:mm:ss')
          })
        }
        return result
      })
    )
  }

  saveCita(data) {
    return this.Http.post(`${environment.url_api}citas/GuardarCitas`, data)
  }

  getCitasCliente(idCliente) {
    return this.Http.get(`${environment.url_api}citas/CitasCliente/${idCliente}`).pipe(
      map((data: any) => data.data)
    )
  }

  getEmpleadosPorServicio(idServicio) {
    return this.Http.get(`${environment.url_api}empleado/GetEmpleadosPorServicio/${idServicio}`).pipe(
      map((data: any) => data.data)
    )
  }

  getCitasEmpresa(idempresa) {
    return this.Http.get(`${environment.url_api}citas/CitasEmpresa/${idempresa}`).pipe(
      map((data: any) => data.data)
    )
  }
}
