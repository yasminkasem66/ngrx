import { CoursesHttpService } from './services/courses-http.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CourseActions } from './action-types';
import { concatMap, map } from 'rxjs/operators';
import { allCoursesLoaded } from './course.action';


@Injectable()


export class CoursesEffects{

    loadCourses=createEffect(()=> this.action$.pipe(
        ofType(CourseActions.loadAllCourses),
        concatMap(action=> this.coursesHttpService.findAllCourses()),
        map(courses=> allCoursesLoaded({courses})) // return new rxjs action that get dispach to the store
    ));

    saveCourse=createEffect(()=> this.action$.pipe(
        ofType(CourseActions.courseUpdated),
        concatMap((action)=>this.coursesHttpService.saveCourse(action.update.id, action.update.changes))

    ),{dispatch:false})

    constructor(private action$:Actions, private coursesHttpService:CoursesHttpService){

    }

}