import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms'
import { Injectable } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material';

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const invalidCtrl = !!(control && form.submitted && control.invalid && control.parent.dirty);
        const invalidParent = !!(control && form.submitted && control.parent && control.parent.invalid && control.parent.dirty);

        return (invalidCtrl || invalidParent);
    }
}

@Injectable({
    providedIn: 'root'
})
export class ClienteFormModel {



    constructor(private _formBuilder: FormBuilder) { }
    matcher = new MyErrorStateMatcher();

    checkPasswords(group: FormGroup) { // here we have the 'passwords' group
        let pass = group.controls.contraseña.value;
        let confirmPass = group.controls.rContraseña.value;

        return pass === confirmPass ? null : { notSame: true }
    }

    infoCliente: FormGroup = this._formBuilder.group({
        nombre: ['', Validators.required],
        apellidos: ['', Validators.required],
        telefono: ['', Validators.required],
        direccion: ['', Validators.required],
        correo: ['', [Validators.required, Validators.email]],
        identificacion: [''],
        contraseña: ['', Validators.required],
        rContraseña: ['']
    }, { validator: this.checkPasswords })
}

