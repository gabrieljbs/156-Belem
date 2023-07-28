import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { presentToast } from '../shared/toast';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise(async (resolve, reject) => {
      const uid = this.authService.getuid();
      if(!uid) {
        console.log('Aqui')
        return false;
      }
      console.log('Aqui')
      return true;
    })
  }

}
