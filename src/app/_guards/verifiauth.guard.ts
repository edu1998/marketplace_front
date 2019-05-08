import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class VerifiauthGuard implements CanActivate {

  constructor(private route: Router) { }

  canActivate(): boolean {
    return this.verifiauth()
  }

  verifiauth(): boolean {
    if (localStorage.getItem('infosesion')) {
      const info = JSON.parse(localStorage.getItem('infosesion'));

      switch (info.rol_id) {
        case 1:
          this.route.navigate(['/empresa'])
          break;
        case 2:
          this.route.navigate(['/cliente'])

      }
      return false
    } else return true;
  }

}
