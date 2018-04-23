import { Injectable, OnInit } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { AuthService } from "../services/auth.service";
import decode from 'jwt-decode';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {

    const expectedRole = route.data.expectedRole;
    const token = localStorage.getItem('id_token');
    const tokenPayload = decode(token);

    if (!this.authService.isAuthenticated() || tokenPayload.role !== expectedRole){
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
