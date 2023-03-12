import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import { HttpService } from './http.service';
import { managerToken } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(
    private storage: StorageService,
    private router: Router,
    private http: HttpService
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let pathName = window.location.pathname;

    let userinfo = this.storage.get(managerToken);
    return new Promise((resolve, reject) => {

    if (pathName.includes('driver-ride-history')) {
      if (userinfo) {
        resolve(true);
      } else {
        location.href = '/login';
        resolve(false);
      }


    } else {
      if (userinfo) {
        location.href = '/driver-ride-history';
        resolve(false);
      } else {
        resolve(true);
      }
    }
  });
}
}