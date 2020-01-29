import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Student } from 'src/app/models/student.model';
import { StudentsService } from '../students.service';
import { ToastrService } from 'src/app/toastr.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent implements OnInit {

  basicDetails: Student;
  state: any;
  isLoading: boolean = false;
  isUpdating: boolean = false;
  classes: any[];
  streams: any[];

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private studentService: StudentsService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.studentService.viewByAdm(this.data.adm)
      .subscribe(res => {
        this.isLoading = false;
        this.basicDetails = res.basic;
        this.state = res.state[0];
        this.classes = res.classes;
        this.streams = res.streams;
      }, e => {
        this.isLoading = false;
        this.toastr.error("Failed to get details.");
      });
  }

  update(form: NgForm) {
    const data = form.value;
    this.isUpdating = true;
    this.studentService.update(data, this.basicDetails.id)
      .subscribe(res => {
        this.isUpdating = false;
        this.toastr.success("Details updated successfully.");
        this.basicDetails = { ...this.basicDetails, ...data };
      }, e => {
        this.isUpdating = false;
        if (e.status === 409) return this.toastr.error("Admission number conflicts with another student.");
        return this.toastr.error("Failed to update student.");
      });
  }

}
