import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Store, select } from '@ngrx/store';
import { AppState } from '../reducers';
import { filter, finalize, first, tap } from 'rxjs/operators';
import { loadAllCourses } from './course.action';
import { CourseState } from './reducers';
import { areCoursesLoaded } from './courses.selectors';


@Injectable()
export class CourseResolver implements Resolve<any> {

    loading:boolean = false;
    constructor(private _router: Router , private store: Store<CourseState>){
        
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) :Observable<any>{
      return this.store.pipe(
        select(areCoursesLoaded),
        tap((areCoursesLoaded) =>{
            if(!this.loading && !areCoursesLoaded) {
                this.loading = true;
                this.store.dispatch(loadAllCourses())
            }
        }),
      // Now, these boolean flag with the emit here, a value that would terminate the observable and, it would trigger the root transition before the data fetching took place.So in order to avoid that, we want to add here a filter Operator, this means that these observable is only going to be terminated. By the first operator, only when the course is loaded, that flag is now set to true, meaning that the data has already been loaded in the store. So now we can allow the transition to complete and we can show the screen to the user.
        filter(areCoursesLoaded=>areCoursesLoaded),
        first(),
        finalize(()=>  this.loading = false)
      );

    }

}