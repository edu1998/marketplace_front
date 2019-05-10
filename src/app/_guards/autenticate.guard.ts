import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AutenticateGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    return this.checkAuth(state.url)
  }

  checkAuth(params: string): boolean {
    if (localStorage.getItem('infosesion')) {
      return true;
    } else {
      let paramsC = params.split('/')[2];
      params === '/empresa' ? this.router.navigate(['/login', 'empresa']) :
        params === '/cliente' || paramsC === 'agendar-cita' ? this.router.navigate(['/login', 'cliente']) : null;
      if (paramsC === 'agendar-cita') {
        localStorage.setItem('urlcita', params)
      }
      return false;
    }
  }

}
