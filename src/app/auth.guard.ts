import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = localStorage.getItem('authToken');
    const userRole = localStorage.getItem('userRole');
    const requiredRole = route.data['role']; // Obtiene el rol requerido de los datos de la ruta

    // Verifica si el usuario tiene el rol requerido
    if (token && userRole === requiredRole) {
      return true; // Permite el acceso si el rol coincide
    }

    // Redirige al login si no cumple con los requisitos
    this.router.navigate(['/login']);
    return false;
  }
}
