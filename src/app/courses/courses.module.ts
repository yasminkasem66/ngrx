import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home/home.component';
import {CoursesCardListComponent} from './courses-card-list/courses-card-list.component';
import {EditCourseDialogComponent} from './edit-course-dialog/edit-course-dialog.component';
import {CoursesHttpService} from './services/courses-http.service';
import {CourseComponent} from './course/course.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {ReactiveFormsModule} from '@angular/forms';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {RouterModule, Routes} from '@angular/router';
import { EntityDataService, EntityDefinitionService, EntityMetadataMap} from '@ngrx/data';
import {compareCourses, Course} from './model/course';

import {compareLessons, Lesson} from './model/lesson';
import { LAZYLOAD_IMAGE_HOOKS, LazyLoadImageModule, ScrollHooks,IntersectionObserverHooks } from 'ng-lazyload-image';
import { CourseResolver } from './courses.resolver';
import { EffectsModule } from '@ngrx/effects';
import { CoursesEffects } from './courses.effects';
import { StoreModule } from '@ngrx/store';
import { courseReducer } from './reducers';

import * as fromCourse from './reducers';



export const coursesRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve:{
      courses: CourseResolver
    }

  },
  {
    path: ':courseUrl',
    component: CourseComponent,

  }
];


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatMomentDateModule,
    ReactiveFormsModule,
    LazyLoadImageModule,
    RouterModule.forChild(coursesRoutes),
    StoreModule.forFeature(fromCourse.courseFeatureKey, courseReducer),
    EffectsModule.forFeature([CoursesEffects])

  ],
  declarations: [
    HomeComponent,
    CoursesCardListComponent,
    EditCourseDialogComponent,
    CourseComponent
  ],
  exports: [
    HomeComponent,
    CoursesCardListComponent,
    EditCourseDialogComponent,
    CourseComponent
  ],
  entryComponents: [EditCourseDialogComponent],
  providers: [
    CoursesHttpService,
    CourseResolver,
    { provide: LAZYLOAD_IMAGE_HOOKS, useClass: IntersectionObserverHooks }
  ]
})
export class CoursesModule {

  constructor() {

  }


}
