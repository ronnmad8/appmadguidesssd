import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 
  private guard = false;

  constructor( private auth: AuthService, private router: Router){}

  canActivate(): boolean  {

    if (this.auth.noAuth()) {
      this.router.navigateByUrl('login');
    }
    this.guard = true;
    return this.guard;
  }

}
