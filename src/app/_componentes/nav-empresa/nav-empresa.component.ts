import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Environment } from 'src/app/_interfaces/environment';
import { environment } from 'src/environments/environment';
import { lagout } from 'src/app/_servicios/shared-function.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-empresa',
  templateUrl: './nav-empresa.component.html',
  styleUrls: ['./nav-empresa.component.css']
})
export class NavEmpresaComponent implements OnInit {

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

  menus: any;
  env: Environment;

  lagout() {
    lagout('empresa', this.route)
  }

  ngOnInit() {
    this.menus = [
      // {
      //   title: 'Inicio',
      //   icon: '',
      //   path: '/empresa'
      // },
      {
        title: 'Configurar',
        icon: 'edit',
        path: 'editar'
      },
      {
        title : 'Agendar cita',
        icon : 'schedule',
        path : 'agendar-cita'
      },
      {
        title : 'Lista de cita',
        icon : 'view_list',
        path : 'lista-citas'
      }
    ]
  }

}
