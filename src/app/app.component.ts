import { Component, OnInit } from '@angular/core';
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { AppState } from './reducers';
import { isLoggedIn, isLoggedOut } from './auth/auth.selectors';
import { login, logout } from './auth/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  loading = true;
  isLoggedIn: Observable<boolean>;
  isLoggedOut: Observable<boolean>;

  constructor(private router: Router, private store: Store<AppState>) {

  }

  ngOnInit() {


    // when refresh go and check the local storage if there is a value then dispatch a specific action in rhe store which helps in making the user get set in the store after refresh
    const userProfile = localStorage.getItem('user');
    if (userProfile) {
      this.store.dispatch(login({ user: JSON.parse(userProfile) }));
    }

    this.router.events.subscribe(event => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });

    this.store.subscribe((state) => {
      console.log({ state });
    })

    // this.isLoggedIn = this.store.pipe(select((state)=> !!state['auth'].user)); 
    this.isLoggedIn = this.store.pipe(select(isLoggedIn));
    // this.isLoggedOut = this.store.pipe(map((state)=> !state['auth'].user)); 
    this.isLoggedOut = this.store.pipe(select(isLoggedOut));
    // with each new value emitted by the store observable, there will be a new value for the is logged in, observable as it's currently implemented, using the map operated now in the case of observables these value here is going to be recalculated each time.We would like to make sure that these observables only emit new values if the value has changed since until changed our rxjs operator. (mapping of values and elimination of duplicates is called the select operator is special  for ngrx/store.)
    // select if the input has not changed the output aren't gonna change


    //If the input remains the same across multiple values emitted by the store, then we are not going to repeat the calculation of the derived value. Instead, we are going to take a previously calculated value from an in-memory cache.So this notion of a mapping function with memory is known in engineering as a selected. Let's then see what the selector looks like.We are going to go here to our authentication module and here we are going to create a new file.We are going to call it off dot selectors dots.


    //select =  map + distinct until 

  }

  logout() {
    this.store.dispatch(logout())
  }

}
