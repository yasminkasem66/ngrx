import { state } from '@angular/animations';
import { AuthState } from './reducers/index';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Store, select } from '@ngrx/store';
import { Observable } from "rxjs";
import { login } from './auth.actions';
import { isLoggedIn } from './auth.selectors';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
@Injectable()


export class authGuard implements CanActivate{

    constructor(private router: Router,private store:Store<AuthState>){

    }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        console.log(" this.store.select(isLoggedIn)", this.store.select(isLoggedIn));

       return this.store.pipe(
            select(isLoggedIn),
            tap((logged:any) => {
                if (!logged && !localStorage.getItem('user')) this.router.navigateByUrl('/login');
            }
            )
        )
        
       
    }

    
}