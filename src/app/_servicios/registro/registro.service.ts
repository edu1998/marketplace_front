import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class RegistroService {

    constructor(private Http: HttpClient) {

    }

    getTypePayment() {
        return this.Http.get(`${environment.url_api}registro/tipoEmpresa`).pipe(
            map((data: any) => data.data)
        )
    }

    saveEntreprise(data) {
        return this.Http.post(`${environment.url_api}registro/guardarEmpresa`, data)
    }

    saveClient(data) { 
        return this.Http.post(`${environment.url_api}registro/guardarCliente`, data)
    }

}
