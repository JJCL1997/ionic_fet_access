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
    const requiredRole = route.data['role'];
  
    console.log('Token:', token);
    console.log('User Role:', userRole);
    console.log('Required Role:', requiredRole);
  
    if (token && userRole === requiredRole) {
      return true;
    }
  
    this.router.navigate(['/login']);
    return false;
  }
  
  
}
