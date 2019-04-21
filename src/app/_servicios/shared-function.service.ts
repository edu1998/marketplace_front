import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SharedFunctionService {

  constructor(
    private _formBuilder: FormBuilder
  ) { }

  //Obtiene el form array al cual se le van a gregar los controles
  /**
   * @param formRoot es el formulario principal del cual se va a sacar
      la propiedad que le van agregar nuevos controles 
   * @param formArray es la propiedad que se desa buscar del padre
   */

  private GetArrayFormControl(formRoot, formArray) {
    return formRoot.get(formArray) as FormArray;
  }

  /**
   * @param GroupControls obtine toda la informacion del formulario que se va a guardar
   * @param propertyForm es la propiedad a la cual se le va agregar informacion
   */

  addArrayFormCotrol(forRoot: FormGroup, GroupControls: FormGroup, propertyForm: string) {
    let data = {};
    for (const key in GroupControls.controls) {
      data[key] = GroupControls.controls[key].value;
    }
    this.GetArrayFormControl(forRoot, propertyForm).
      push(this._formBuilder.control(data));

    GroupControls.reset();
  }

  deletArrayFormContro(forRoot: FormGroup, propertyForm: string, index: number) {
    this.GetArrayFormControl(forRoot, propertyForm).
      removeAt(index)
  }
  
}
