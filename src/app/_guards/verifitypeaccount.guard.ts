import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class typeaccounemterpriceGuard implements CanActivate {

  constructor(private route: Router) { }

  canActivate(): boolean {
    const info = JSON.parse(localStorage.getItem('infosesion'));
    if (info.rol_id === 1) { this.route.navigate(['/empresa']); return false } else return true
  }

}

@Injectable({
  providedIn: 'root'
})
export class typeaccounclientGuard implements CanActivate {

  constructor(private route: Router) { }

  canActivate(): boolean {
    const info = JSON.parse(localStorage.getItem('infosesion'));
    if (info.rol_id === 2) { this.route.navigate(['/cliente']); return false } else return true
  }

}