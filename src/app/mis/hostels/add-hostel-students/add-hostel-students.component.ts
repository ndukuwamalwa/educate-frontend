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
  selectedHostel: any;
  selected: number[] = [];
  isAddingToHostel: boolean = false;
  selectedClass: number;
  hostelFull: boolean = false;

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
    this.selectedClass = +clas;
    this.isLoading = true;
    this.hostelService.unallocated(clas, hostel)
      .subscribe(res => {
        this.students = res;
        this.isLoading = false;
      }, e => {
        this.isLoading = false;
        this.toastr.error("Failed to load students.");
      });
  }

  onHostelChange(host) {
    const hostel = this.hostels.find(h => +h.id === +host);
    this.selectedHostel = hostel;
    if (hostel.capacity === hostel.total) {
      this.hostelFull = true;
    } else {
      this.hostelFull = false;
    }
  }

  check(id: number) {
    const i = this.selected.indexOf(+id);
    if (i < 0) {
      if (this.selectedHostel.capacity === (this.selectedHostel.total + this.selected.length)) {
        return this.toastr.info("There are no spaces available for allocation.");
      }
      this.selected.push(+id);
    } else {
      this.selected.splice(i, 1);
    }
  }

  addToHostel() {
    this.isAddingToHostel = true;
    this.hostelService.addStudents(this.selectedHostel.id, this.selected)
      .subscribe(res => {
        this.isAddingToHostel = false;
        this.loadStudents({ hostel: this.selectedHostel.id, clas: this.selectedClass });
        this.selectedHostel.total += this.selected.length;
        this.selected = [];
        this.toastr.success("Students added to hostel successfully.");
      }, e => {
        this.isAddingToHostel = false;
        if (e.status === 409) return this.toastr.error(e.error.message);
        return this.toastr.error("Failed to add students to hostel.");
      });
  }

}
