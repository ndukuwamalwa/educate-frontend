import { Component, OnInit } from '@angular/core';
import { HostelService } from '../hostel.service';
import { ClassService } from '../../classes/class.service';
import { ToastrService } from 'src/app/toastr.service';

@Component({
  selector: 'app-add-hostel-students',
  templateUrl: './add-hostel-students.component.html',
  styleUrls: ['./add-hostel-students.component.scss']
})
export class AddHostelStudentsComponent implements OnInit {
  hostels: any[];
  classes: any[];
  students: any[];
  isLoading: boolean = false;
  selectedHostel: number;
  selected: number[] = [];
  isAddingToHostel: boolean = false;
  selectedClass: number;

  constructor(
    private hostelService: HostelService,
    private classService: ClassService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.hostelService.list()
      .subscribe(res => {
        this.hostels = res;
      }, e => {
        this.toastr.error("Failed to load hostels");
      });
    this.classService.classes()
      .subscribe(res => {
        this.classes = res;
      }, e => {
        this.toastr.error("Failed to load classes.");
      });
  }

  loadStudents({ hostel, clas }) {
    this.selectedHostel = +hostel;
    this.selectedClass = +clas;
    this.isLoading = true;
    this.hostelService.unallocated(clas)
      .subscribe(res => {
        this.students = res;
        this.isLoading = false;
      }, e => {
        this.isLoading = false;
        this.toastr.error("Failed to load students.");
      });
  }

  onHostelChange(host) {
    this.selectedHostel = +host;
  }

  check(id: number) {
    const i = this.selected.indexOf(+id);
    if (i < 0) {
      this.selected.push(+id);
    } else {
      this.selected.splice(i, 1);
    }
  }

  addToHostel() {
    this.isAddingToHostel = true;
    this.hostelService.addStudents(this.selectedHostel, this.selected)
      .subscribe(res => {
        this.isAddingToHostel = false;
        this.loadStudents({ hostel: this.selectedHostel, clas: this.selectedClass });
        this.selected = [];
        this.toastr.success("Students added to hostel successfully.");
      }, e => {
        this.isAddingToHostel = false;
        if (e.status === 409) return this.toastr.error("Some students already exist in the hostel. Please refresh page.");
        return this.toastr.error("Failed to add students to hostel.");
      });
  }

}
