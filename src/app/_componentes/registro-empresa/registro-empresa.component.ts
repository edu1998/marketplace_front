import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { RegistroService } from '../../_servicios/registro/registro.service';
import { EmpresaFormModel } from '../../_formModel/empresa.form-model'
import { SharedFunctionService } from 'src/app/_servicios/shared-function.service';
import { MatSnackBar } from '@angular/material';


@Component({
    selector: 'app-registro-empresa',
    templateUrl: './registro-empresa.component.html',
    styleUrls: ['./registro-empresa.component.css']
})
export class RegistroEmpresaComponent implements OnInit {

    constructor(
        private _registroService: RegistroService,
        private _empresaForm: EmpresaFormModel,
        public _sharedFunction: SharedFunctionService,
        private snackBar: MatSnackBar
    ) {

    }

    infoEmpresaFormGroup: FormGroup;
    listCategoriasFormGrop: FormGroup;
    listServicesFormGrop: FormGroup;
    listaEmpleadosFormGoup: FormGroup;

    listaTipoEmpresa: Observable<any>;

    categoriesColumns: string[] = ['codigo', 'nombre', 'acciones'];
    servicesColumns: string[] = ['codigo', 'categoria', 'nombre', 'duracion', 'precio', 'acciones']
    empleadosColumns: string[] = ['nombre', 'telefono', 'identificacion', 'acciones']

    SaveEnterprise() {
        this._registroService.saveEntreprise(this.infoEmpresaFormGroup.value).subscribe((data: any) => {
            if (data.code === 200) {
                this.snackBar.open('Su empresa ha sido registrada con exito', 'Aceptar', {
                    duration: 2000,
                    verticalPosition: 'top',
                    horizontalPosition: 'right'
                });
            } else {
                this.snackBar.open('Error al registrar la empresa', 'Otra oportunidad', {
                    duration: 2000,
                    verticalPosition: 'top',
                    horizontalPosition: 'right'
                });

            }
        })
    }


    ngOnInit() {

        this.listaTipoEmpresa = this._registroService.getTypePayment();

        // inicializando los formularios
        this.infoEmpresaFormGroup = this._empresaForm.infoEnterprice;
        this.listCategoriasFormGrop = this._empresaForm.listCategories;
        this.listServicesFormGrop = this._empresaForm.listServices;
        this.listaEmpleadosFormGoup = this._empresaForm.listEmployes;
        //------------------------
    }

}
