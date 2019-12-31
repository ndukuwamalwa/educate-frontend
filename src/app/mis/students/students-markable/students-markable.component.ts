import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { Student } from 'src/app/models/student.model';
import { StudentsService } from '../students.service';
import { ToastrService } from 'src/app/toastr.service';

@Component({
  selector: 'app-students-markable',
  templateUrl: './students-markable.component.html',
  styleUrls: ['./students-markable.component.scss']
})
export class StudentsMarkableComponent implements OnChanges, OnInit {

  @Input('method') method: string;
  @Output('studentIds') studentIds: EventEmitter<number[]> = new EventEmitter();
  total: number = 0;
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
  students: Student[];
  isLoading: boolean = false;

  constructor(private studentService: StudentsService, private toastr: ToastrService) { }

  ngOnChanges() {
    if (this.method) {
      this.getStudents();
    }
  }

  ngOnInit() {
    this.onStudent([]);
  }

  getStudents(options = {}) {
    this.isLoading = true;
    this.studentService[this.method](options)
    .subscribe(res => {
      this.total = res.total;
      this.students = res.items;
      this.isLoading = false;
    }, e => {
      this.isLoading = false;
      this.toastr.error("Failed to fetch students.");
    });
  }

  onOptionsChange(options) {
    this.getStudents(options);
  }

  onStudent(ids: number[]) {
    this.studentIds.emit(ids);
  }

}
