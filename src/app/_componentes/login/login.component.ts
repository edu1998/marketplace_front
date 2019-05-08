import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../_servicios/login/login.service'
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { environment } from '../../../environments/environment'
import { parseJson } from 'src/app/_servicios/shared-function.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(
        public _loginService: LoginService,
        private _route: ActivatedRoute,
        private _router: Router,
        private snackBar: MatSnackBar
    ) {

        this.credentials = { user: null, pass: null, type: this._route.params['_value'].typeAccount }
    }

    public credentials: { user: string, pass: string, type: any };

    Iniciar() {
        this._loginService.Iniciar(this.credentials).subscribe({
            next: (data: any) => {
                if (data.code === 200) {
                    switch (data.data[0].rol_id) {
                        case 1:
                            this._router.navigate(['empresa'])
                            break;
                        case 2:
                            this._router.navigate(['cliente']);
                            break;
                        default:
                            break;
                    }
                    localStorage.setItem('infosesion', JSON.stringify(data.data[0]))
                    environment.name_sesion = parseJson();
                    this.snackBar.open(data.message, 'Aceptar', {
                        duration: 3000,
                        verticalPosition: 'top',
                        horizontalPosition: 'right'
                    });
                } else {
                    this.snackBar.open(data.message, 'Aceptar', {
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

        })
    }


    validParms() {
        if (this._route.params['_value'].typeAccount !== 'empresa'
            && this._route.params['_value'].typeAccount !== 'cliente') {
            this._router.navigate(['home'])
        }
    }

    ngOnInit() {
        this.validParms();
    }

}
