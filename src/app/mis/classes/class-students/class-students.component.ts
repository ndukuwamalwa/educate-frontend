import { Component, OnInit } from '@angular/core';
import { Class } from 'src/app/models/class.model';
import { ClassService } from '../class.service';
import { ToastrService } from 'src/app/toastr.service';

@Component({
  selector: 'app-class-students',
  templateUrl: './class-students.component.html',
  styleUrls: ['./class-students.component.scss']
})
export class ClassStudentsComponent implements OnInit {

  selectedClass: number;
  classes: Class[];
  total: number;
  students: any[];
  isLoading: boolean = false;
  sorts: { label: string, key: string }[] = [
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
      label: "Gender",
      key: "gender"
    }
  ];

  constructor(
    private classService: ClassService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.classService.classes()
      .subscribe(res => {
        this.classes = res;
      }, e => {
        this.toastr.error("Failed to load classes.");
      });
  }

  onClassChange(clas: number) {
    this.selectedClass = clas;
    this.getStudents();
  }

  onOptions(options) {
    this.getStudents(options);
  }

  getStudents(options = {}) {
    this.isLoading = true;
    this.classService.getClassStudents(this.selectedClass, options)
      .subscribe(res => {
        this.isLoading = false;
        this.students = res.items;
        this.total = res.total;
      }, e => {
        this.isLoading = false;
        this.toastr.error("Failed to load students.");
      });
  }

}
