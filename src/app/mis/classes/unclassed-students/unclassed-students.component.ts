import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student.model';
import { Stream } from 'src/app/models/stream.model';
import { ClassService } from '../class.service';
import { ToastrService } from 'src/app/toastr.service';

@Component({
  selector: 'app-unclassed-students',
  templateUrl: './unclassed-students.component.html',
  styleUrls: ['./unclassed-students.component.scss']
})
export class UnclassedStudentsComponent implements OnInit {
  total: number;
  students: Student[];
  streams: Stream[];
  isLoading: boolean = false;
  selectedStudents: number[] = [];
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
      label: "Admitted",
      key: "admitted"
    }
  ];

  constructor(
    private classService: ClassService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.classService.streams()
      .subscribe(res => {
        this.streams = res;
      }, e => {
        this.toastr.error("Unable to load streams.");
      });
    this.getStudents();
  }

  onOptions(options) {
    this.getStudents(options);
  }

  getStudents(options = {}) {
    this.isLoading = true;
    this.classService.unclassed(options)
      .subscribe(res => {
        this.total = res.total;
        this.students = res.items;
        this.isLoading = false;
      }, e => {
        this.isLoading = false;
        this.toastr.error("Failed to load students.");
      });
  }

  check(id) {
    const entered = this.selectedStudents.indexOf(+id);
    if (entered === -1) {
      this.selectedStudents.push(+id);
    } else {
      this.selectedStudents.splice(entered, 1);
    }
  }

  addToClass({ stream }) {
    this.isLoading = true;
    this.classService.addStudents(stream, this.selectedStudents)
      .subscribe(res => {
        this.isLoading = false;
        this.getStudents();
        this.toastr.success("Students added to selected class successfully.");
        this.selectedStudents = [];
      }, e => {
        this.isLoading = false;
        if (e.status === 409) return this.toastr.error("Some students already exist in the class. Please refresh page.");
        this.toastr.error("Failed to add students to class.");
      });
  }

}
