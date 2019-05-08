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

  checkAuth(params): boolean {
    if (localStorage.getItem('infosesion')) {
      return true;
    } else {
      params === '/empresa' ? this.router.navigate(['/login', 'empresa']) :
        params === '/cliente' ? this.router.navigate(['/login', 'cliente']) : null
        
      return false;
    }
  }

}
