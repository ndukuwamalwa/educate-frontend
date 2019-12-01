import { Component, OnInit } from '@angular/core';
import { HostelsService } from '../hostels.service';
import { ToastrService } from 'src/app/toastr.service';
import { ClassService } from '../../class/class.service';
import { Student } from 'src/app/models/student.model';

@Component({
  selector: 'app-hostels',
  templateUrl: './hostels.component.html',
  styleUrls: ['./hostels.component.scss']
})
export class HostelsComponent implements OnInit {
  isSavingHostel: boolean = false;
  hostels: any[];
  isGettingHostels: boolean = false;
  classes: Class[];
  loadedStudents: Student[];
  studentsToAdd: number[] = [];
  isGettingStudentsToAdd: boolean = false;
  selectedHostel: string;
  isAddingToHostel: boolean = false;
  isGettingHostelStudents: boolean = false;
  hostelStudents: any[];
  streams: any[];
  classStreams: any[];

  constructor(
    private hostelsService: HostelsService,
    private toastr: ToastrService,
    private classService: ClassService
  ) { }

  ngOnInit() {
    this.getClasses();
    this.getHostels();
    this.classService.getStreams()
    .subscribe(res => {
      this.streams = res.items;
    }, e => {
      this.toastr.error("Failed to load streams.");
    });
  }

  getClassStreams(id) {
    const streams = this.streams.filter(val => +val.classId === +id);
    this.classStreams = streams;
  }

  getClasses() {
    if (this.classes) return;
    this.classService.getClasses()
      .subscribe(res => {
        this.classes = res.items;
      }, err => {
        this.toastr.error(`Failed to load classes. Some operations may not function expected.`);
      });
  }

  addHostel(data) {
    this.isSavingHostel = true;
    this.hostelsService.addHostel(data)
      .subscribe(res => {
        if (this.hostels) {
          this.hostels.push({ id: res.id, ...data, occupants: 0 });
        }
        this.isSavingHostel = false;
        this.toastr.success("New hostel created successfully.");
      }, err => {
        this.isSavingHostel = false;
        if (err.status === 409) return this.toastr.error("Hostel already exists.");
        this.toastr.error("Failed to add hostel.");
      });
  }

  getHostels() {
    if (this.hostels) return;
    this.isGettingHostels = true;
    this.hostelsService.getHostels()
      .subscribe(res => {
        this.hostels = res.items;
        this.isGettingHostels = false;
      }, err => {
        this.isGettingHostels = false;
        this.toastr.error("Failed to get hostels.");
      });
  }

  deleteHostel(id) {
    if (!confirm("Are you sure you want to delete hostel?")) return;
    this.hostelsService.deleteHostel(id)
      .subscribe(res => {
        const hostel = this.hostels.find(v => +v.id === +id);
        const index = this.hostels.indexOf(hostel);
        this.hostels.splice(index, 1);
        this.toastr.success("Hostel deleted successfully.");
      }, err => {
        this.toastr.error("Failed to delete hostel.");
      });
  }

  addStateChange(event, studentId) {
    if (event.target.checked) {
      this.studentsToAdd.push(+studentId);
    } else {
      const index = this.studentsToAdd.indexOf(+studentId);
      this.studentsToAdd.splice(index, 1);
    }
  }

  loadStudents({ hostel, stream }) {
    this.isGettingStudentsToAdd = true;
    this.hostelsService.getStudentsNotInHostel(hostel, stream)
      .subscribe(res => {
        this.studentsToAdd = [];
        this.loadedStudents = res;
        this.selectedHostel = hostel;
        this.isGettingStudentsToAdd = false;
      }, err => {
        this.isGettingStudentsToAdd = false;
        this.toastr.error("Failed to load students. Please retry.");
      });
  }

  addStudents() {
    this.isAddingToHostel = true;
    const studentHostels = [];
    this.studentsToAdd.forEach(val => {
      studentHostels.push({ student: val, hostel: +this.selectedHostel });
    });
    this.hostelsService.addStudentsToHostel(studentHostels)
      .subscribe(res => {
        this.isAddingToHostel = false;
        this.toastr.success(`Added ${studentHostels.length} to the selected hostel. You can remove by selecting 'View students'`);
        this.loadedStudents = this.loadedStudents.filter(student => !this.studentsToAdd.includes(+student.id));
        this.studentsToAdd = [];
      }, err => {
        this.isAddingToHostel = false;
        if (err.status === 417) return this.toastr.error(err.error.message);
        this.toastr.error("Failed to add students to hostel. Please retry.");
      });
  }

  viewStudents({ hostel }) {
    this.isGettingHostelStudents = true;
    this.hostelsService.getHostelStudents(hostel)
      .subscribe(res => {
        this.hostelStudents = res;
        this.isGettingHostelStudents = false;
      }, err => {
        this.isGettingHostelStudents = false;
        this.toastr.error("Problem loading students.");
      });
  }

  removeStudent(id) {
    if (!confirm("Are you sure you want to remove student from the hostel.")) return;
    this.hostelsService.deleteStudent(id)
    .subscribe(res => {
      this.toastr.success("Student removed successfully.");
      const item = this.hostelStudents.find(val => +val.id === +id);
      const index = this.hostelStudents.indexOf(item);
      this.hostelStudents.splice(index, 1);
    });
  }

}
