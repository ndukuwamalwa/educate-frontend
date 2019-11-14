import { Component, OnInit } from '@angular/core';
import { InstituteService } from '../institute.service';
import { ToastrService } from 'src/app/toastr.service';
import { BatchService } from '../../batch/batch.service';
import { Student } from 'src/app/models/student.model';

@Component({
  selector: 'app-institute',
  templateUrl: './institute.component.html',
  styleUrls: ['./institute.component.scss']
})
export class InstituteComponent implements OnInit {
  isAddingAcademicYear: boolean = false;
  academicYears: any[];
  isGettingAcademicYears: boolean = false;
  isSavingHostel: boolean = false;
  hostels: any[];
  isGettingHostels: boolean = false;
  batches: Batch[];
  loadedStudents: Student[];
  studentsToAdd: number[] = [];
  isGettingStudentsToAdd: boolean = false;
  selectedHostel: string;
  selectedYear: string;
  isAddingToHostel: boolean = false;
  isGettingHostelStudents: boolean = false;
  hostelStudents: any[];

  constructor(
    private instituteService: InstituteService,
    private toastr: ToastrService,
    private batchService: BatchService
  ) { }

  ngOnInit() {
    this.getAcademicYears();
    this.getBatches();
    this.getHostels();
  }

  getBatches() {
    if (this.batches) return;
    this.batchService.getBatches()
      .subscribe(res => {
        this.batches = res.items;
      }, err => {
        this.toastr.error(`Failed to load classes. Some operations may not function expected.`);
      });
  }

  addAcademicYear(data) {
    this.isAddingAcademicYear = true;
    this.instituteService.addYear(data)
      .subscribe(res => {
        this.isAddingAcademicYear = false;
        if (this.academicYears) {
          this.academicYears.push({ id: res.id, startDate: data.startDate, endDate: data.endDate, label: data.label });
        }
        this.toastr.success("Academic year created successfully.");
      }, err => {
        this.isAddingAcademicYear = false;
        if (err.status === 409) return this.toastr.error("Similar academic year exists.");
        this.toastr.error("Failed to add academic year.");
      });
  }

  getAcademicYears() {
    if (this.academicYears) return;
    this.isGettingAcademicYears = true;
    this.instituteService.getAcademicYears()
      .subscribe(res => {
        this.academicYears = res.items;
        this.isGettingAcademicYears = false;
      }, err => {
        this.isGettingAcademicYears = false;
        this.toastr.error("Failed to get academic years.");
      });
  }

  deleteAcademicYear(id) {
    if (!confirm('Are you sure you want to delete academic year?')) return;
    this.instituteService.deleteAcademicYear(id)
      .subscribe(res => {
        const a_year = this.academicYears.find(val => +val.id === +id);
        const index = this.academicYears.indexOf(a_year);
        this.academicYears.splice(index, 1);
      }, err => {
        this.toastr.error("Failed to delete academic year.");
      });
  }

  addHostel(data) {
    this.isSavingHostel = true;
    this.instituteService.addHostel(data)
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
    this.instituteService.getHostels()
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
    this.instituteService.deleteHostel(id)
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

  loadStudents({ hostel, academicYear, batch }) {
    this.isGettingStudentsToAdd = true;
    this.instituteService.getStudentsNotInHostel(hostel, academicYear, batch)
      .subscribe(res => {
        this.studentsToAdd = [];
        this.loadedStudents = res;
        this.selectedHostel = hostel;
        this.selectedYear = academicYear;
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
      studentHostels.push({ student: val, hostel: +this.selectedHostel, academicYear: +this.selectedYear });
    });
    this.instituteService.addStudentsToHostel(studentHostels)
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

  viewStudents({ hostel, academicYear }) {
    this.isGettingHostelStudents = true;
    this.instituteService.getHostelStudents(hostel, academicYear)
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
    this.instituteService.deleteStudent(id)
    .subscribe(res => {
      this.toastr.success("Student removed successfully.");
      const item = this.hostelStudents.find(val => +val.id === +id);
      const index = this.hostelStudents.indexOf(item);
      this.hostelStudents.splice(index, 1);
    });
  }

}
