import { Component, OnInit } from '@angular/core';
import { ClienteFormModel } from 'src/app/_formModel/cliente.form-model';
import { ClienteService } from 'src/app/_servicios/cliente/cliente.service';
import { idEmpresOCliente } from '../../_servicios/shared-function.service'
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {

  constructor(
    public _clienteForm: ClienteFormModel,
    private _clientSer: ClienteService,
    private snackBar: MatSnackBar
  ) { }

  getInfoPersona() {
    this._clientSer.getInfoGeneral(idEmpresOCliente()).subscribe({
      next: (data: any) => {
        this._clienteForm.infoCliente.patchValue({
          nombre: data.nombre,
          telefono: data.telefono,
          apellidos: data.apellido,
          direccion: data.direccion,
          correo: data.correo,
          identificacion: data.identificacion,
        })
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

  updateClient() {
    this._clienteForm.infoCliente.value.id = idEmpresOCliente();
    this._clientSer.updateInfoPersona(this._clienteForm.infoCliente.value)
      .subscribe({
        next: () => {
          this.getInfoPersona();
          this.snackBar.open('Datos actulizados', 'Ok', {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'right'
          });
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

  ngOnInit() {
    this._clienteForm.infoCliente.get('correo').setValidators(Validators.nullValidator)
    this._clienteForm.infoCliente.get('correo').disable()
    this._clienteForm.infoCliente.get('contraseña').setValidators(Validators.nullValidator)
    this._clienteForm.infoCliente.get('rContraseña').setValidators(Validators.nullValidator)
    this.getInfoPersona()
  }

}
