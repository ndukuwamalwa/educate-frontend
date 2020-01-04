import { Component, Input, OnChanges } from '@angular/core';
import { StudentsService } from '../students.service';
import { Student } from 'src/app/models/student.model';
import { ToastrService } from 'src/app/toastr.service';
import { StudentDetailsComponent } from '../student-details/student-details.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnChanges {

  @Input('title') title: string;
  @Input('method') method: string;
  @Input('options') options: {};
  isGettingStudents: boolean = false;
  students: Student[];
  total: number;
  isLoading: boolean = false;
  columns: { label: string, key: string }[] = [
    {
      label: "Adm",
      key: "adm"
    },
    {
      label: "First name",
      key: "fname"
    },
    {
      label: "Last name",
      key: "lname"
    },
    {
      label: "Date admitted",
      key: "admitted"
    },
    {
      label: "Date of Birth",
      key: "dob"
    },
    {
      label: "Gender",
      key: "gender"
    },
    {
      label: "County",
      key: "county"
    }
  ];

  statusColumns: { label: string, key: string }[] = [
    {
      label: "Adm",
      key: "adm"
    },
    {
      label: "First name",
      key: "fname"
    },
    {
      label: "Last name",
      key: "lname"
    },
    {
      label: "Start date",
      key: "startDate"
    },
    {
      label: "End date",
      key: "endDate"
    },
    {
      label: "Reason",
      key: "reason"
    }
  ];

  constructor(
    private studentService: StudentsService,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) { }

  ngOnChanges() {
    if (this.title && this.method && this.options) {
      this.getData({ ...this.options });
    }
  }

  getData(options) {
    this.isLoading = true;
    this.studentService[this.method](options)
      .subscribe(res => {
        this.total = res.total;
        this.students = res.items;
        this.isLoading = false;
      }, e => {
        this.toastr.error("Failed to get students");
        this.isLoading = false;
      });
  }

  onOptionsChange(options) {
    this.getData({ ...this.options, ...options });
  }

  onStudentClicked(student) {
    const dialog = this.dialog.open(StudentDetailsComponent, {
      width: "auto",
      height: "auto",
      data: student
    });
    dialog.afterClosed()
      .subscribe(s => {
        if (s) {
          this.students.splice(this.students.indexOf(student), 1, { ...student, ...s });
        }
      });
  }
}
