import { createAction, props } from "@ngrx/store";
import { Course } from "./model/course";
import { Update } from "@ngrx/entity";



export const loadAllCourses = createAction(
    "[Courses Resolver] Load All Courses" // origin of action -what happen
);

export const allCoursesLoaded = createAction(
    "[Load Courses Effect] All Courses Loaded", //origin of action -what happen 
    props<{courses:Course[]}>()
);

// we are not going to be adding reducing logic for  load all courses, which is the action that triggers the and backend call that loads the data from the backend. This action, the load all courses Action does not require any reducer logic. This action will simply trigger a side effect that is going to load data from the backend. On the other hand, all courses loaded that gets dispatched once the data comes back from the backend. This action does need some reducers logic, so let's implement it here.

export const courseUpdated= createAction(
    "[Edit Course Dialog] Course Updated",
    props<{update:Update<Course>}>()  //these update property is going to be of type update, of course. So this is a special type made available by the ngrx entity package that makes it easy to modify data storage entity format.
)
