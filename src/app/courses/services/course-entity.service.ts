import { Injectable } from "@angular/core";
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from "@ngrx/data";
import { Course } from "../model/course";


@Injectable()
export class CourseEntityService extends EntityCollectionServiceBase<Course>{
 
    constructor(private serviceElementsFactory:EntityCollectionServiceElementsFactory){
        super('Course',serviceElementsFactory);
    }
}


//this is actually a fased service that allows us to do several things. It allows us to manipulate directly the entities in the cache. It allows us to fetch the data from the backend and even save it by automatically generating the HTTP request that we need to do so. And it also allows us to query the data in the store using the entities dolar observable. as we can see, the course entity service is a facade service that brings together all the functionality that we need to manage our course entity state.