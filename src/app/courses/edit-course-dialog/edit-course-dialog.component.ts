import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Course } from '../model/course';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CoursesHttpService } from '../services/courses-http.service';
import { CourseEntityService } from '../services/course-entity.service';

@Component({
  selector: 'course-dialog',
  templateUrl: './edit-course-dialog.component.html',
  styleUrls: ['./edit-course-dialog.component.css']
})
export class EditCourseDialogComponent {

  form: FormGroup;

  dialogTitle: string;

  course: Course;

  mode: 'create' | 'update';

  loading$: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditCourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private coursesService: CourseEntityService) {

    this.dialogTitle = data.dialogTitle;
    this.course = data.course;
    this.mode = data.mode;

    const formControls = {
      description: ['', Validators.required],
      category: ['', Validators.required],
      longDescription: ['', Validators.required],
      promo: ['', []]
    };

    if (this.mode == 'update') {
      this.form = this.fb.group(formControls);
      this.form.patchValue({ ...data.course });
    }
    else if (this.mode == 'create') {
      this.form = this.fb.group({
        ...formControls,
        url: ['', Validators.required],
        iconUrl: ['', Validators.required]
      });
    }
  }

  onClose() {
    this.dialogRef.close();
  }

  onSave() {

    const course: Course = {
      ...this.course,
      ...this.form.value
    };

    if (this.mode == 'update') {
      this.coursesService.update(course);
      // Now, instead of implementing these HTP put called manually ourselves like we were doing before, we are going to instead be using here the course this entity service.If we search here on the dropdown of available methods, we are going to see here several methods,such as, for example, update absurd.We have also methods that update the data directly in the cache.But the method that we are looking for here is the update method.Now, this method is going to not only update the data in memory in the store, but it's also goingto generate automatically by convention and output request that is going to get sent to our backend.
      //  So as you can see, our user interface was not updated while the save was still ongoing. This means that by default, ngrx data has a pessimistic approach to updates and data is going to wait for the updates to occur on the server before updating the content of the store.    We would like to do our updates in an optimistic way where the UI immediately reflects the data changes on the screen while the save is getting then on the background in an optimistic way.
      this.dialogRef.close();
    } else if (this.mode == 'create') {
      //This call to add is going to trigger  post observable and it's going to return us an observable that we can subscribe to. And these observable is going to complete when the call to the backend completes successfully. These observable is going to emit here a value which is going to be our new course value that we just created.
      this.coursesService.add(course).subscribe(data => {
        console.log({data});
        
      });
      this.dialogRef.close();
    }

    // this.coursesService.saveCourse(course.id, course)
    //   .subscribe(
    //     () => this.dialogRef.close()
    //   )


  }


}
