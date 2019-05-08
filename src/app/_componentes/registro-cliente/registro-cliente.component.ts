import { Component, OnInit } from '@angular/core';
import { ClienteFormModel } from 'src/app/_formModel/cliente.form-model';
import { RegistroService } from 'src/app/_servicios/registro/registro.service';
import { MatSnackBar } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-registro-cliente',
  templateUrl: './registro-cliente.component.html',
  styleUrls: ['./registro-cliente.component.css']
})
export class RegistroClienteComponent implements OnInit {

  constructor(
    public _clienteForm: ClienteFormModel,
    public registroService: RegistroService,
    private snackBar: MatSnackBar
  ) { }

  saveClient() {
    this.registroService.saveClient(this._clienteForm.infoCliente.value).subscribe(
      {
        next: (data: any) => {
          if (data.code === 200) {
            this.snackBar.open(data.message, 'Aceptar', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'right'
            });
          } else {
            this.snackBar.open('Error al registrarse', 'Otra oportunidad', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'right'
            });

          }
        },
        error: (error: HttpErrorResponse) => {
          this.snackBar.open(error.error.messageError, 'Ok', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right'
          });
        }
      }
    );
  }

  ngOnInit() {

  }

}
