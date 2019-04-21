import { FormArray, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: "root"
})
export class EmpresaFormModel {

    constructor(
        private _formBuilder: FormBuilder,
    ) { }

    listCategories: FormGroup = this._formBuilder.group({
        codigo: [''],
        nombre: [''],
        descripcion: [''],
    })

    listServices: FormGroup = this._formBuilder.group({
        codigo: [''],
        nombre: [''],
        precio: [''],
        duracion_minutos: [''],
        descripcion: [''],
        cod_categoria: ['']
    })

    listEmployes: FormGroup = this._formBuilder.group({
        nombre: [''],
        apellido: [''],
        telefono: [''],
        identificacion: [''],
        direccion: [''],
        correo: [''],
        servicios: [''],
    })

    infoEnterprice: FormGroup = this._formBuilder.group({
        infoGeneral: this._formBuilder.group({
            tipoEmpresa: ['', Validators.required],
            nombre: ['', Validators.required],
            horaApertura: ['', Validators.required],
            horaCierre: ['', Validators.required],
            Ubicacion: ['', Validators.required],
            diasAtencion: this._formBuilder.group({
                domingo: [false],
                lunes: [false],
                martes: [false],
                miercoles: [false],
                jueves: [false],
                viernes: [false],
                sabado: [false],
            }),
        }),
        registroCategorias: this._formBuilder.array([

        ]),
        registroServicios: this._formBuilder.array([

        ]),
        registroEmpleados: this._formBuilder.array([

        ]),
        infoInicio: this._formBuilder.group({
            correo: ['', [Validators.required, Validators.email]],
            contraseña: ['', Validators.required]
        })
    })



}
