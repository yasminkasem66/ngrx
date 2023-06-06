import {
    createReducer,
    on
} from '@ngrx/store';
import { CourseActions } from '../action-types';
import { Course, compareCourses } from '../model/course';
import { EntityState, createEntityAdapter } from '@ngrx/entity';

export const courseFeatureKey = 'course';

export interface CourseState extends EntityState<Course> {

    areCoursesLoaded:boolean;

    //entities:{[key: string]: Course}, ids:number[],
    //  courses:Course[];
    //is the array  the ideal format for storing entities. As we know, entities such as courses and lessons all have a unique identifier.So a very common operation in an engineering program is to look up an entity by identifier.If we would need to implement that with this format, it would mean that we would have to loop through the array each time, which could be a bit time-Consuming. If we have a lot of data in order to make it simple to access the courses. By Id, we would prefer instead to create here an entity's dictionary.So this is a key value map whose keys are the identifiers of the entities and the values are the entities themselves using.TypeScript, we can define such a map in the following way.
    //  So now we have a new format in which it's much easier to do a lookup by ID, but we would need here
    //an auxiliary function to transform this into an array. And also the array also contains some other information, which is the order of the entities which might still be important.
    //Now, this format here, even though it's the most powerful format for saving entities in the store, it's not very convenient to handle. So we will have to write reducers that handle this format, which could be a bit verbose and time consuming  so will use ngrx entity module

    // So in order to make it simple for us to implement all typical grid operations, such as adding a list of courses to our store, removing or updating only one course, etc., Ingenix entity provides us an auxiliary utility known as an adapter.

}

export const adapter = createEntityAdapter<Course>(
    {
        sortComparer: compareCourses,
        selectId: course => course.id, // if it is id then it's not important to  type this line 
    }
);
export const initialCourseState = adapter.getInitialState({
    areCoursesLoaded :false,
})
//   export const initialCourseState: CourseState = {
//     courses: undefined
//   };

export const courseReducer = createReducer(
    initialCourseState,
    on(CourseActions.allCoursesLoaded, (state, action) => adapter.addMany(action.courses,{ ...state, areCoursesLoaded:true})),
    on(CourseActions.courseUpdated, (state, action) => adapter.updateOne(action.update,state))
        // return {
        //     courses :  action.courses
        // }
    )
    
export const { selectAll } = adapter.getSelectors();