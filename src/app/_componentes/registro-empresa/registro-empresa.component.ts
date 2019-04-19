import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { RegistroService } from '../../_servicios/registro/registro.service';


@Component({
    selector: 'app-registro-empresa',
    templateUrl: './registro-empresa.component.html',
    styleUrls: ['./registro-empresa.component.css']
})
export class RegistroEmpresaComponent implements OnInit {

    @ViewChild('formDirective') private formDirective: NgForm;

    constructor(
        private _formBuilder: FormBuilder,
        private _registroService: RegistroService
    ) {

    }

    infoEmpresaFormGroup: FormGroup;
    listCategoriasFormGrop: FormGroup;

    listaTipoEmpresa: Observable<any>;

    CategoriesColumns: string[] = ['codigo', 'nombre', 'acciones'];

    expression() {
        console.log(this.infoEmpresaFormGroup);
    }



    //Obtiene el form array al cual se le van a gregar los controles
    /**
     * @param formRoot es el formulario principal del cual se va a sacar
        la propiedad que le van agregar nuevos controles 
     * @param formArray es la propiedad que se desa buscar del padre
     */
    GetArrayFormControl(formRoot, formArray) {
        return formRoot.get(formArray) as FormArray;
    }

    /**
     * @param GroupControls obtine toda la informacion del formulario que se va a guardar
     * @param propertyForm es la propiedad a la cual se le va agregar informacion
     */
    addArrayFormCotrol(forRoot: FormGroup, GroupControls: FormGroup, propertyForm: string) {
        console.log(GroupControls);

        let data = {};
        for (const key in GroupControls.controls) {
            data[key] = GroupControls.controls[key].value;
        }
        this.GetArrayFormControl(forRoot, propertyForm).
            push(this._formBuilder.control(data));

        this.listCategoriasFormGrop.reset();
    }

    deletArrayFormContro(forRoot: FormGroup, propertyForm: string, index: number) {
        this.GetArrayFormControl(forRoot, propertyForm).
            removeAt(index)
    }



    ngOnInit() {

        this.listaTipoEmpresa = this._registroService.getTypePayment();

        this.listCategoriasFormGrop = this._formBuilder.group({
            codigo: [''],
            nombre: [''],
            descripcion: [''],
        })
        this.infoEmpresaFormGroup = this._formBuilder.group({
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

            ])
        })

    }

}
