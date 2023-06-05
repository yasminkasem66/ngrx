import { User } from './model/user.model';
//So a side effect is something extra that we want to do in our application after an action has been dispatched and processed by the store. So after the reducers linked to the action have been triggered, we want to do something else, such as, for example, save data to back into local storage, etc..

import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Injectable } from '@angular/core';
import { AuthActions } from "./action-types";
import { tap } from "rxjs/operators";
import { Router } from '@angular/router';
@Injectable()

//So a side effect is something that is done in response to a given action. So the action gets dispatched, its reducer gets triggered, and then after that, we want to do something else. In this case, we want to also, as a side effect, save the user profile on local stories.



export class AuthEffects {
    ////3
    //if something goes wrong with this side effect observable, that the observable is going to get recreated again.Also, we don't have here any manual subscriptions to our observable side effect, 
    $logIn = createEffect(() =>
        this.$actions.pipe(
            ofType(AuthActions.login),
            tap(action => localStorage.setItem('user', JSON.stringify(action.user)))
        ), { dispatch: false }

    )


    $logout = createEffect(() =>
        this.$actions.pipe(
            ofType(AuthActions.logout),
            tap(action => {
                localStorage.removeItem('user');
                this.router.navigateByUrl('/login');
            
            })
        ), { dispatch: false }
    )



    constructor(private $actions: Actions,private router:Router) {
        // //1
        // $actions.subscribe(action =>{

        //     if(action.type === '[Login Page] User Login'){
        //         localStorage.setItem('user', JSON.stringify( action["user"]));
        //     }

        // })
        ////2
        // const $logIn = this.$actions.pipe(
        //   ofType(AuthActions.login),
        //   tap(action=>{
        //     localStorage.setItem('user', JSON.stringify( action.user));
        //   })
        // ).subscribe()





    }
}