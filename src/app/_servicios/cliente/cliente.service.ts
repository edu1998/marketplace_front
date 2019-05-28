import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private Http: HttpClient) {
  }

  getInfoGeneral(idEmpleado) {
    return this.Http.get(`${environment.url_api}cliente/InfoPersona/${idEmpleado}`).pipe(
      map((data: any) => data.data)
    )
  }
  
  updateInfoPersona(info) {
    return this.Http.put(`${environment.url_api}Cliente/InfoPersona`, info)
  }
  
  getCLiente(documentoCliente){
    return this.Http.get(`${environment.url_api}cliente/GetPersona/${documentoCliente}`).pipe(
      map((data: any) => data.data)
    )
  }
}
