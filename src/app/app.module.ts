import { BrowserModule } from '@angular/platform-browser';
import { NgModule, isDevMode } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';

import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';

import { EffectsModule } from '@ngrx/effects';
import { EntityDataModule } from '@ngrx/data';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { metaReducers, reducers } from './reducers';
import { authGuard } from './auth/auth.guard';


const routes: Routes = [
  {
    path: 'courses',
    loadChildren: () => import('./courses/courses.module').then(m => m.CoursesModule),
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: '/'
  }
];



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatToolbarModule,
    AuthModule.forRoot(),
    StoreModule.forRoot(reducers, {
      metaReducers,  //So a metal reducer is a reducer of function just like any other.It follows the same concepts, such as it takes the current state and action and produces a new version of a state.  But the difference is that a metal producer is going to be processed before the normal reducers are invoked. So that's the main difference.

      //So whenever an action gets dispatched in our application, such as, for example, the login action, what ngrx store is going to do is it's going to trigger any metal reducers that it might have configured before handling the log in action. These metal producers have a specific order. They will be executed in that specific order every time when all the metal producers are finished. Only then normal actions, such as, for example, the log-in or logout action are going to be handled.
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictActionSerializability: true, //date aren't seralized in js
        strictStateSerializability: true
      }
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router', //the state of the router is also going to be saved in our store
      routerState: RouterState.Minimal //router state that contains the current URL, it contains the parameters that were used for transitioning
    })
    //ngrx development tool  time traveling  debugger   in order for this to work, we are going to need to integrate the dev tools with the router.The router is what controls what page gets displayed here in the center of the screen.  ngrxRouterStoreModule()(StoreRouterConnectingModule) This is how the engine dev tools are going to be able to trigger screen transitions for us by keeping the router state inside the store. We are going to need a property to save that store and we are going to set that property name as being router.
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}


