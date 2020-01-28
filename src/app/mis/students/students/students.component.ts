import { Component, OnInit } from '@angular/core';
import { TabLink } from 'src/app/models/tab-link';
import { studentLinks } from '../links';
import { Student } from 'src/app/models/student.model';
import { ToastrService } from 'src/app/toastr.service';
import { StudentsService } from '../students.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from 'src/app/custom-elements/confirm/confirm.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  links: TabLink[] = studentLinks();
  isLoading: boolean = false;
  toArchive: number[] = [];
  toDelete: number[] = [];
  toRestore: number[] = [];
  viewFrom: string = "expelled";

  constructor(
    private toastr: ToastrService,
    private studentService: StudentsService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit() {

  }

  addStudent(student: Student) {
    this.isLoading = true;
    this.studentService.add(student)
      .subscribe(res => {
        this.isLoading = false;
        this.toastr.success("Student added successfully");
        this.studentService.recentUrls = {};
      }, e => {
        this.isLoading = false;
        if (e.status === 409) return this.toastr.error("Admission number has already been used.");
        return this.toastr.error("Failed to add student. Please retry.");
      });
  }

  onStudentImported(students: Student[]) {
    this.isLoading = true;
    this.studentService.add(students)
      .subscribe(res => {
        this.isLoading = false;
        this.toastr.success("Students added successfully");
      }, e => {
        this.isLoading = false;
        if (e.status === 409) return this.toastr.error("Admission number conflict encountered.");
        return this.toastr.error("Failed to add students. Please retry.");
      });
  }

  addLeave(leave) {
    this.isLoading = true;
    this.studentService.sentOnLeave(leave)
      .subscribe(res => {
        this.isLoading = false;
        this.toastr.success("Operation successful");
        this.router.navigate(['students', 'view', 'leave']);
      }, e => {
        this.isLoading = false;
        if (e.status === 404) return this.toastr.error("Student by the given admission number was not found.");
        if (e.status === 409) return this.toastr.error(e.error.message);
        return this.toastr.error("Operation failed.");
      });
  }

  addSuspension(suspension) {
    this.isLoading = true;
    this.studentService.suspend(suspension)
      .subscribe(res => {
        this.isLoading = false;
        this.toastr.success("Operation successful");
        this.router.navigate(['students', 'view', 'suspended']);
      }, e => {
        this.isLoading = false;
        if (e.status === 404) return this.toastr.error("Student by the given admission number was not found.");
        if (e.status === 409) return this.toastr.error(e.error.message);
        return this.toastr.error("Operation failed.");
      });
  }

  addExpulsion(expulsion) {
    this.isLoading = true;
    this.studentService.expell(expulsion)
      .subscribe(res => {
        this.isLoading = false;
        this.toastr.success("Operation successful");
        this.router.navigate(['students', 'view', 'expelled']);
        this.studentService.recentUrls = {};
      }, e => {
        this.isLoading = false;
        if (e.status === 404) return this.toastr.error("Student by the given admission number was not found.");
        if (e.status === 409) return this.toastr.error(e.error.message);
        return this.toastr.error("Operation failed.");
      });
  }

  onAddToDeleteList(ids: number[]) {
    this.toDelete = ids;
  }

  onAddToArchiveList(ids: number[]) {
    this.toArchive = ids;
  }

  onAddToRestoreList(ids: number[]) {
    this.toRestore = ids;
  }

  archive(comment: string) {
    this.isLoading = true;
    const data = this.toArchive.map(id => {
      return {
        id,
        comment
      };
    });
    this.studentService.archive(data)
      .subscribe(res => {
        this.isLoading = false;
        this.toastr.success(`Archived ${this.toArchive.length} students`);
        this.toArchive = [];
        this.router.navigate(['students', 'view', 'archived']);
        this.studentService.recentUrls = {};
      }, e => {
        this.isLoading = false;
        this.toastr.error("Failed to execute request.");
      });
  }

  changeViewMode(mode) {
    this.viewFrom = mode;
  }

  delete() {
    const cnf = this.dialog.open(ConfirmComponent, {
      width: "auto",
      height: "auto",
      data: "Delete student records?"
    });
    cnf.afterClosed()
      .subscribe(r => {
        if (r) {
          this.isLoading = true;
          this.studentService.delete(this.toDelete)
            .subscribe(res => {
              this.isLoading = false;
              this.toastr.success("Students deleted successfully.");
              this.router.navigate(['students', 'view', 'active']);
              this.studentService.recentUrls = {};
            }, e => {
              this.isLoading = false;
              this.toastr.error("Could not delete part/all of the selected students. Please retry.");
            });
        }
      });
  }

  restore() {
    const cnf = this.dialog.open(ConfirmComponent, {
      width: "auto",
      height: "auto",
      data: "Restore student records?"
    });
    cnf.afterClosed()
      .subscribe(r => {
        if (r) {
          this.isLoading = true;
          this.studentService.restore(this.toRestore)
            .subscribe(res => {
              this.isLoading = false;
              this.toastr.success("Students restored successfully.");
              this.router.navigate(['students', 'view', 'active']);
              this.studentService.recentUrls = {};
            }, e => {
              this.isLoading = false;
              this.toastr.error("Failed to restore some/all of the students.");
            });
        }
      });
  }

}
