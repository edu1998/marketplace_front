import { Component, OnInit, ViewChild } from '@angular/core';
import { EmpresaFormModel } from '../../_formModel/empresa.form-model'
import { FormGroup } from '@angular/forms';
import { EmpresaService } from '../../_servicios/empresa/empresa.service';
import { idEmpresOCliente } from '../../_servicios/shared-function.service'
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar, MatTable } from '@angular/material';
import { Subscription, Observable } from 'rxjs';


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
    this._empresaSer.deleteCAtegorias(id).subscribe({
      next: () => {
        this.getCategorias();
        this.tableCategorias.renderRows();
      },
      error: (error: HttpErrorResponse) => {
        this.snackBar.open(error.error.messageError, 'Ok', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
      }
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
    this._empresaSer.deleteServicios(idServicio).subscribe({
      next: () => {
        this.getServicios();
        this.tableServicios.renderRows();
      },
      error: (error: HttpErrorResponse) => {
        this.snackBar.open(error.error.messageError, 'Ok', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
      }
    })
  }

  getEmpleados() {
    this.empleadosSubscription = this._empresaSer.getEmpleados(idEmpresOCliente())
  }

  addEmpleado() {
    this.empleadosSubscription.subscribe((data: Array<any>) => {
      const filter = data.filter(empleado => parseInt(empleado.identificacion) === this._empresaForm.listEmployes.value.identificacion)
      if (!filter.length) {
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
    this._empresaSer.deleteEmpleado(idEmpleado).subscribe({
      next: () => {
        this.getEmpleados();
        this.tableEmpleados.renderRows();
      },
      error: (error: HttpErrorResponse) => {
        this.snackBar.open(error.error.messageError, 'Ok', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
      }
    })
  }

  editCategoria: boolean;
  idCategoria: number;
  selectUpdateCategorias(categoria) {
    this.editCategoria = true;
    this.idCategoria = categoria.id
    this._empresaForm.listCategories.patchValue({
      codigo: categoria.codigo,
      nombre: categoria.nombre,
      descripcion: categoria.descripcion
    })
  }

  updateCategoria() {
    this._empresaForm.listCategories.value.id = this.idCategoria;
    this._empresaSer.updateCategoria(this._empresaForm.listCategories.value)
      .subscribe({
        next: () => {
          this._empresaForm.listCategories.reset();
          this.getCategorias();
          this.tableCategorias.renderRows();
          this.idCategoria = null;
          this.editCategoria = false;
        },
        error: (error: HttpErrorResponse) => {
          this.snackBar.open(error.error.messageError, 'Ok', {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'right'
          });
        }
      })
  }


  editServicio: boolean;
  selectServicio: any;
  idServicio: number;
  idCategoriaServicio: number;
  selectUpdateServicio(servicio) {
    this.idServicio = servicio.id;
    this.editServicio = true;
    this.selectServicio = servicio.cod_categoria
    this._empresaForm.listServices.patchValue({
      codigo: servicio.codigo,
      nombre: servicio.nombre,
      precio: servicio.precio,
      duracion_minutos: servicio.duracion_minutos,
      descripcion: servicio.descripcion,
      cod_categoria: servicio.cod_categoria,
    })
  }

  updateServicio() {
    this._empresaForm.listServices.value.id = this.idServicio;
    this._empresaForm.listServices.value.id_categoria = this.idCategoriaServicio;
    this._empresaSer.updateServicio(this._empresaForm.listServices.value)
      .subscribe({
        next: () => {
          this._empresaForm.listServices.reset();
          this.getServicios();
          this.editServicio = false;
          this.selectServicio = null;
          this.idServicio = null;
          this.idCategoriaServicio = null;
        },
        error: (error: HttpErrorResponse) => {
          this.snackBar.open(error.error.messageError, 'Ok', {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'right'
          });
        }
      })
  }

  editEmpleado: boolean;
  idEmpleado: number;
  codigosServicio: Array<any>
  selectUpdateEmpleado(empleado) {
    this.editEmpleado = true;
    this.idEmpleado = empleado.id
    this.codigosServicio = empleado.servicios.map(data => data.codigo);
    this._empresaForm.listEmployes.patchValue({
      nombre: empleado.nombre,
      apellido: empleado.apellido,
      telefono: empleado.telefono,
      identificacion: empleado.identificacion,
      direccion: empleado.direccion,
      correo: empleado.correo,
      servicios: this.codigosServicio
    });
  }

  resetFormPersona() {
    this._empresaForm.listEmployes.reset({
      nombre: '',
      apellido: '',
      telefono: '',
      identificacion: '',
      direccion: '',
      correo: '',
      servicios: []
    })
  }

  updateEmpleado() {
    this._empresaForm.listEmployes.value.id = this.idEmpleado;
    this._empresaForm.listEmployes.value.idEmpresa = idEmpresOCliente();
    console.log(this._empresaForm.listEmployes.value);
    this._empresaSer.updateEmpleado(this._empresaForm.listEmployes.value)
      .subscribe({
        next: (data) => {
          this.resetFormPersona();
          this.idEmpleado = null;
          this.editEmpleado = false;
          this.getEmpleados();
        },
        error: (error: HttpErrorResponse) => {
          this.snackBar.open(error.error.messageError, 'Ok', {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'right'
          });
        }
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
