import { Component, OnInit, ViewChild } from '@angular/core';
import { EmpresaFormModel } from '../../_formModel/empresa.form-model'
import { FormGroup } from '@angular/forms';
import { EmpresaService } from '../../_servicios/empresa/empresa.service';
import { idEmpresOCliente } from '../../_servicios/shared-function.service'
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar, MatTable } from '@angular/material';
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-editar-empresa',
  templateUrl: './editar-empresa.component.html',
  styleUrls: ['./editar-empresa.component.css']
})
export class EditarEmpresaComponent implements OnInit {

  @ViewChild('categorias') private tableCategorias: MatTable<any>
  @ViewChild('servicios') private tableServicios: MatTable<any>
  @ViewChild('empleados') private tableEmpleados: MatTable<any>

  constructor(
    public _empresaForm: EmpresaFormModel,
    private _empresaSer: EmpresaService,
    private snackBar: MatSnackBar
  ) { }

  infoGeneralForm: FormGroup;
  categoriasForm: FormGroup;
  private infoGneralSubscription: Subscription;
  private updateInfoGsusb: Subscription;
  categoriasSubscription: Observable<any>;
  ServiciosSubscription: Observable<any>;
  empleadosSubscription: Observable<any>;
  categoriesColumns: string[] = ['codigo', 'nombre', 'acciones'];
  servicesColumns: string[] = ['codigo', 'categoria', 'nombre', 'duracion', 'precio', 'acciones']
  empleadosColumns: string[] = ['nombre', 'telefono', 'identificacion', 'acciones']

  getInfoGeneral(): void {
    this.infoGneralSubscription = this._empresaSer.getInfoGeneral(idEmpresOCliente())
      .subscribe({
        next: (data: any) => {
          this.infoGeneralForm.patchValue({
            tipoEmpresa: data.tipo_empresa,
            nombre: data.nombre,
            horaApertura: data.h_apertura,
            horaCierre: data.h_cierre,
            Ubicacion: data.ubicacion,
            diasAtencion: data.dias_atencion
          });
        },
        error: (error: HttpErrorResponse) => {
          this.snackBar.open(error.error.messageError, 'Ok', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right'
          });
        }
      })
  }

  updateInfoGeneral() {
    this.infoGeneralForm.value.id = idEmpresOCliente();
    this.updateInfoGsusb = this._empresaSer.updateInfoGeneral(this.infoGeneralForm.value)
      .subscribe({
        next: (data: any) => {
          this.snackBar.open(data.message, 'Aceptar', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right'
          });
        },
        error: (error: HttpErrorResponse) => {
          this.snackBar.open(error.error.messageError, 'Ok', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right'
          });
        }
      })
  }

  getCategorias() {
    this.categoriasSubscription = this._empresaSer.getCategorias(idEmpresOCliente())
  }

  addCategorias() {
    this.categoriasSubscription.subscribe((data: Array<any>) => {
      const filter = data.filter(categoria => categoria.codigo === this._empresaForm.listCategories.value.codigo)
      if (!filter.length) {
        this._empresaForm.listCategories.value.id = idEmpresOCliente();
        this._empresaSer.addCategorias(this._empresaForm.listCategories.value)
          .subscribe(() => {
            this._empresaForm.listCategories.reset();
            this.getCategorias();
            this.tableCategorias.renderRows();
            this.snackBar.open('Categoria agregada', 'Ok', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'right'
            });
          });
      } else {
        this.snackBar.open('Codigo ya existe', 'Ok', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
      }
    });
  }

  deleteCategorias(id) {
    this._empresaSer.deleteCAtegorias(id).subscribe(data => {
      this.getCategorias();
      this.tableCategorias.renderRows();
    });
  }

  getServicios() {
    this.ServiciosSubscription = this._empresaSer.getServicios(idEmpresOCliente())
  }

  addServicios() {
    this.ServiciosSubscription.subscribe((data: Array<any>) => {
      const filter = data.filter(servicio => servicio.codigo === this._empresaForm.listServices.value.codigo)
      if (!filter.length) {
        this._empresaForm.listServices.value.idEmpresa = idEmpresOCliente();
        this._empresaSer.addServicios(this._empresaForm.listServices.value)
          .subscribe({
            next: () => {
              this.getServicios();
              this.tableServicios.renderRows();
              this._empresaForm.listServices.reset();
              this.snackBar.open('Servicio agregado', 'Ok', {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'right'
              })
            },
            error(error: HttpErrorResponse) {
              this.snackBar.open('Error al agregar el servicio', 'Ok', {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'right'
              })
            }
          })
      } else {
        this.snackBar.open('Codigo ya existe', 'Ok', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
      }
    })
  }

  deleteServicios(idServicio) {
    this._empresaSer.deleteServicios(idServicio).subscribe(data => {
      this.getServicios();
      this.tableServicios.renderRows();
    })
  }

  getEmpleados() {
    this.empleadosSubscription = this._empresaSer.getEmpleados(idEmpresOCliente())
  }

  addEmpleado() {
    this.empleadosSubscription.subscribe((data: Array<any>) => {
      const filter = data.filter(empleado => parseInt(empleado.identificacion) === this._empresaForm.listEmployes.value.identificacion)
      if (! filter.length) {
        this._empresaForm.listEmployes.value.idEmpresa = idEmpresOCliente();
        this._empresaSer.addEmpleado(this._empresaForm.listEmployes.value)
          .subscribe({
            next: () => {
              this.getEmpleados();
              this.tableEmpleados.renderRows();
              this._empresaForm.listEmployes.reset();
              this.snackBar.open('Empleado agregado', 'Ok', {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'right'
              })
            },
            error: () => {
              this.snackBar.open('Error al agregar el empleado', 'Ok', {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'right'
              })
            }
          })
      } else {
        this.snackBar.open('Empleado ya existe', 'Ok', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
      }
    });

  }

  deleteEmleado(idEmpleado) {
    this._empresaSer.deleteEmpleado(idEmpleado).subscribe(() => {
      this.getEmpleados();
      this.tableEmpleados.renderRows();
    })
  }

  ngOnInit(): void {
    this.infoGeneralForm = this._empresaForm.infoEnterprice.
      get('infoGeneral') as FormGroup;
    this.getInfoGeneral();
    this.getCategorias();
    this.getServicios();
    this.getEmpleados();
  }

  ngOnDestroy(): void {
    // this.infoGneralSubscription.unsubscribe();
    // this.updateInfoGsusb.unsubscribe();
  }

}
