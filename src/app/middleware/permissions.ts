import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AdminGuard implements CanActivateChild {
  errorMessage:any;
  constructor(private router: Router) {}

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot):
      boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const isAdmin = JSON.parse(localStorage.getItem('access_token')!).adminRole || false;

    if (!isAdmin) {
      this.router.navigate(['/error']);
      return false;
    }

    return true;
  }

}
