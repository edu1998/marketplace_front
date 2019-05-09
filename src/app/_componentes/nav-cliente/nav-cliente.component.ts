import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment'
import { Environment } from 'src/app/_interfaces/environment';
import { lagout } from 'src/app/_servicios/shared-function.service';

@Component({
    selector: 'app-nav-cliente',
    templateUrl: './nav-cliente.component.html',
    styleUrls: ['./nav-cliente.component.css']
})
export class NavClienteComponent {

    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
        .pipe(
            map(result => result.matches)
        );

    constructor(
        private breakpointObserver: BreakpointObserver,
        private route: Router
    ) {
        this.env = environment;
    }

    env: Environment;
    menus: any;

    lagout() {
        lagout('cliente', this.route)
    }

    ngOnInit(): void {
        this.menus = [
            {
                title: 'Inicio',
                icon: '',
                path: ''
            },
            {
                title: 'Editar',
                icon: 'edit',
                path: 'editar'
            }
        ]
    }
}
