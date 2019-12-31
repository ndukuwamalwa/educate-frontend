import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Stream } from 'src/app/models/stream.model';
import { Class } from 'src/app/models/class.model';
import { ToastrService } from 'src/app/toastr.service';
import { AttendanceService } from '../attendance.service';
import { ClassService } from '../../classes/class.service';
import { Subscribable } from 'rxjs';

type ClassStudent = {
  adm: string;
  studentId: number;
  name: string;
  class: string;
  stream: string;
};

@Component({
  selector: 'app-absent-students',
  templateUrl: './absent-students.component.html',
  styleUrls: ['./absent-students.component.scss']
})
export class AbsentStudentsComponent implements OnInit {

  @Input('category') category: string;
  @Output('present') present: EventEmitter<number[]> = new EventEmitter();
  headers: { label: string, key: string }[] = [
    {
      key: "adm",
      label: "Adm"
    },
    {
      label: "Name",
      key: "name"
    },
    {
      label: "Class",
      key: "class"
    },
    {
      label: "Stream",
      key: "stream"
    }
  ];
  students: any[];
  streams: Stream[];
  classes: Class[];
  isLoading: boolean = false;
  isMarking: boolean = false;
  selected: number[] = [];
  selectedClass: number;
  selectedStream: number;

  constructor(
    private classService: ClassService,
    private toastr: ToastrService,
    private attendanceService: AttendanceService
  ) { }

  ngOnInit() {
    this.classService.streams()
      .subscribe(res => {
        this.streams = res;
      }, e => {
        this.toastr.error("Failed to load streams");
      });
    this.classService.classes()
      .subscribe(res => {
        this.classes = res;
      }, e => {
        this.toastr.error("Failed to load classes.");
      });
  }

  onStudents(ids: number[]) {
    this.selected = ids;
  }

  loadStudents(id: number, stream: boolean) {
    this.isLoading = true;
    let subscribable: Subscribable<any>;
    if (stream) {
      subscribable = this.attendanceService.loadStream(id);
      this.selectedClass = this.streams.find(s => +s.id === +id).classId;
      this.selectedStream = +id;
    } else {
      subscribable = this.attendanceService.loadClass(id);
      this.selectedClass = +id;
    }
    subscribable.subscribe(res => {
      this.students = res;
      this.isLoading = false;
    }, e => {
      this.toastr.error("Failed to load students.");
      this.isLoading = false;
    });
  }

  mark() {
    this.isMarking = true;
    this.attendanceService.mark(this.selectedClass, this.selected)
      .subscribe(res => {
        this.isMarking = false;
        this.selected = [];
        this.toastr.success("Register saved successfully.");
        if (this.selectedStream) {
          this.loadStudents(this.selectedStream, true);
        } else {
          this.loadStudents(this.selectedClass, false);
        }
      }, e => {
        this.isMarking = false;
        if (e.status === 409) return this.toastr.error("Some students have already been marked. Please reload students.");
        return this.toastr.error("Unable to mark register. Please retry.");
      });
  }

}
