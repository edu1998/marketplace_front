import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutenticateGuard } from './_guards/autenticate.guard'
import { VerifiauthGuard } from './_guards/verifiauth.guard'
import { typeaccounemterpriceGuard,typeaccounclientGuard } from './_guards/verifitypeaccount.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: './_modulos/home/home.module#HomeModule',
    canActivate: [VerifiauthGuard]
  },
  {
    path: 'registro',
    loadChildren: './_modulos/registro/registro.module#RegistroModule',
    canActivate: [VerifiauthGuard]
  },
  {
    path: 'login/:typeAccount',
    loadChildren: './_modulos/login/login.module#LoginModule',
    canActivate: [VerifiauthGuard]
  },
  {
    path: 'empresa',
    loadChildren: './_modulos/empresa/empresa.module#EmpresaModule',
    canActivate: [AutenticateGuard,typeaccounclientGuard]
  },
  {
    path: 'cliente',
    loadChildren: './_modulos/cliente/cliente.module#ClienteModule',
    canActivate: [AutenticateGuard, typeaccounemterpriceGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
