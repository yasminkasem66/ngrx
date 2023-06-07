import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { CourseEntityService } from './course-entity.service';
import { filter, first, map, tap } from 'rxjs/operators';


@Injectable()

export class CourseResolver implements Resolve<boolean>{
    constructor(private coursesService: CourseEntityService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

        return this.coursesService.loaded$.pipe(
            tap(loaded => {
                if (!loaded) {
                    this.coursesService.getAll().pipe(map(courses => !!courses))
                }
            }), filter(loaded => !!loaded), first()
        )

        //filter here only the true values. Otherwise the transition would complete with a false value, which we don't want. We want to make sure that the data is loaded before completing the transition. So the first operator is going to make sure that whenever the first value gets emitted, the observable is going to get completed.
        // Filter here is making sure that we wait for the data to be loaded in the store and first is completing
        // return this.coursesService.getAll().pipe(map(courses=>!!courses))
        //It's important to understand that this is not meant to fetch data from the store. For that, there is another api get. get All is meant to trigger an Http get request that is going to retrieve all the courses from the back end.We will have similar methods for searching, for example, only a subset of the courses by passing insome query parameters.So what we want to do here is to make sure that we only call this get all method once the first timethat our course resolver gets triggered, the next few times, the data is already going to be presentin the store.So we don't need to fetch it each time with each router transition.

    }

}
 