import { allCoursesLoaded } from './course.action';
import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromCourse from "./reducers/index"



export const selectCourseState = createFeatureSelector<fromCourse.CourseState>(fromCourse.courseFeatureKey);
export const selectAllCourses = createSelector(
    selectCourseState,
    fromCourse.selectAll
);

export const selectBeginnerCourses = createSelector(
    selectAllCourses,
    courses=>courses.filter(c=>c.category === 'BEGINNER')
)
export const selectAdvanceCourses = createSelector(
    selectAllCourses,
    courses=>courses.filter(c=>c.category === 'ADVANCED')
)
export const selectPromoTotal = createSelector(
    selectAllCourses,
    courses=>courses.filter(c=>c.promo).length
)
export const areCoursesLoaded = createSelector(
    selectCourseState,
    state=>state.areCoursesLoaded
)