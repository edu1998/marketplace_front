import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private Http: HttpClient) { }

  getInfoGeneral(idEmpresa) {
    return this.Http.get(`${environment.url_api}empresa/InfoGeneral/${idEmpresa}`).pipe(
      map((data: any) => data.data)
    )
  }

  updateInfoGeneral(info) {
    return this.Http.put(`${environment.url_api}empresa/InfoGeneral`, info)
  }

  getCategorias(idEmpresa) {
    return this.Http.get(`${environment.url_api}empresa/Categorias/${idEmpresa}`).pipe(
      map((data: any) => data.data)
    )
  }

  addCategorias(data) {
    return this.Http.post(`${environment.url_api}empresa/Categorias`, data)
  }

  deleteCAtegorias(idCategoria) {
    return this.Http.delete(`${environment.url_api}empresa/Categorias/${idCategoria}`)
  }

  updateCategoria(data) {
    return this.Http.put(`${environment.url_api}empresa/Categorias`, data)
  }

  getServicios(idEmpresa) {
    return this.Http.get(`${environment.url_api}empresa/Servicios/${idEmpresa}`).pipe(
      map((data: any) => data.data)
    )
  }

  addServicios(data) {
    return this.Http.post(`${environment.url_api}empresa/Servicios`, data)
  }

  deleteServicios(idServicio) {
    return this.Http.delete(`${environment.url_api}empresa/Servicios/${idServicio}`)
  }

  updateServicio(data) {
    return this.Http.put(`${environment.url_api}empresa/Servicios`, data)
  }

  getEmpleados(idEmpresa) {
    return this.Http.get(`${environment.url_api}empresa/Empleados/${idEmpresa}`).pipe(
      map((data: any) => data.data)
    )
  }

  addEmpleado(data) {
    return this.Http.post(`${environment.url_api}empresa/Empleados`, data)
  }

  deleteEmpleado(idEmpleado) {
    return this.Http.delete(`${environment.url_api}empresa/Empleados/${idEmpleado}`)
  }

  updateEmpleado(data) {
    return this.Http.put(`${environment.url_api}empresa/Empleados`, data)
  }

  getEmprsaDireccion(direccion) {
    return this.Http.get(`${environment.url_api}empresa/EmpresaDireccion/${direccion}`).pipe(
      map((data: any) => data.data)
    )
  }
}
