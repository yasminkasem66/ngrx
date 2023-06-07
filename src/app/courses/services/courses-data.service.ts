import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { DefaultDataService, HttpUrlGenerator } from "@ngrx/data";
import { Course } from '../model/course';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
// So in order to be able to handle custom payloads that don't follow the format expected by indirects
export class CourseDataService extends DefaultDataService<Course> {

    constructor( http:HttpClient, httUrlGenerator:HttpUrlGenerator ){
        super('Course',http,httUrlGenerator);
    }

    getAll(): Observable<Course[]> {
        return this.http.get('/api/courses').pipe(
            map(res=>res["payload"])
        )
    }


}