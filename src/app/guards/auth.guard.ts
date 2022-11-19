import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AlertasService } from '../services/alertas.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 
  private guard = false;

  constructor( 
      private auth: AuthService
    , private router: Router
    , private alertasService: AlertasService
    ){}

  canActivate(): boolean  {

    let valid = this.auth.noAuth();
    if (valid) {
      this.router.navigateByUrl('home');
    }
    else  {
      this.guard = true;
    }
    
    return this.guard;

  }



}
