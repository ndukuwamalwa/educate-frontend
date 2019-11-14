import { Component, OnInit } from '@angular/core';
import { BatchService } from '../../batch/batch.service';
import { ToastrService } from 'src/app/toastr.service';
import { AttendanceService } from '../attendance.service';
import { Student } from 'src/app/models/student.model';

@Component({
  selector: 'app-attendance-create',
  templateUrl: './attendance-create.component.html',
  styleUrls: ['./attendance-create.component.scss']
})
export class AttendanceCreateComponent implements OnInit {
  batches: Batch[];
  isGettingBatches: boolean = false;
  isLoadingStudents: boolean = false;
  students: Student[];
  attendance: any[] = [];
  isSendingAttendance: boolean = false;
  isGettingRegister: boolean = false;
  register: any[];

  constructor(
    private batchService: BatchService,
    private toastr: ToastrService,
    private attendanceService: AttendanceService
  ) { }

  ngOnInit() {
    this.isGettingBatches = true;
    this.batchService.getBatches()
      .subscribe(res => {
        this.batches = res.items;
        this.isGettingBatches = false;
      }, err => {
        this.toastr.error("Failed to load batches");
        this.isGettingBatches = false;
      });
  }

  loadStudents(batch) {
    this.isLoadingStudents = true;
    this.batchService.getStudents(batch)
      .subscribe(res => {
        this.students = res;
        this.isLoadingStudents = false;
      }, err => {
        this.isLoadingStudents = false;
        this.toastr.error("Failed to load students.");
      });
  }

  onPresentChange(event, studentId) {
    if (event.target.checked) {
      this.attendance.push(+studentId);
    } else {
      const index = this.attendance.indexOf(+studentId);
      this.attendance.splice(index, 1);
    }
  }

  sendAttended() {
    if (this.attendance.length === 0) return;
    this.isSendingAttendance = true;
    this.attendanceService.send(this.attendance)
      .subscribe(res => {
        this.attendance = [];
        this.toastr.success("Register saved successfully.");
        this.isSendingAttendance = false;
      }, err => {
        this.isSendingAttendance = false;
        if (err.status === 409) return this.toastr.info("Register has already been marked.");
        this.toastr.error("Failed to save register.");
      });
  }

  viewAttendance({ batch, date }) {
    this.isGettingRegister = true;
    this.attendanceService.getRegister(batch, date)
      .subscribe(res => {
        this.register = res;
        this.isGettingRegister = false;
      }, err => {
        this.isGettingRegister = false;
        this.toastr.error("Failed while getting register.");
      });
  }

  remove(id) {
    if (!window.confirm('Remove this attendance record?')) return;
    this.attendanceService.delete(id)
      .subscribe(res => {
        const att = this.register.find(val => +val.id === +id);
        const index = this.register.indexOf(att);
        this.register.splice(index, 1);
        this.toastr.success("Attendance record deleted successfully.");
      }, err => {
        this.toastr.error("Failed to remove attendance record.");
      });
  }

}
