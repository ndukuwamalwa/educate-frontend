import { Component, OnInit } from '@angular/core';
import { HostelService } from '../hostel.service';
import { ToastrService } from 'src/app/toastr.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from 'src/app/custom-elements/confirm/confirm.component';

@Component({
  selector: 'app-view-hostel-students',
  templateUrl: './view-hostel-students.component.html',
  styleUrls: ['./view-hostel-students.component.scss']
})
export class ViewHostelStudentsComponent implements OnInit {
  hostels: any[];
  total: number;
  students: any[];
  selectedHostel: number;
  isLoading: boolean = false;
  sorts: { key: string, label: string }[] = [
    {
      label: "Adm",
      key: "adm"
    },
    {
      label: "Name",
      key: "name"
    }
  ];

  constructor(
    private hostelService: HostelService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.hostelService.list()
      .subscribe(res => {
        this.hostels = res;
      }, e => {
        this.toastr.error("Failed to load hostels.");
      });
  }

  onHostelChange(id) {
    this.selectedHostel = +id;
    this.getStudents();
  }

  onOptions(options) {
    this.getStudents(options);
  }

  getStudents(options = {}) {
    this.isLoading = true;
    this.hostelService.getStudents(this.selectedHostel, options)
      .subscribe(res => {
        this.students = res.items;
        this.total = res.total;
        this.isLoading = false;
      }, e => {
        this.isLoading = false;
        this.toastr.error("Failed to load students");
      });
  }

  delete(student) {
    const cnf = this.dialog.open(ConfirmComponent, {
      width: "300px",
      height: "150px",
      data: "Remove student?"
    });
    cnf.afterClosed()
      .subscribe(res => {
        if (res) {
          this.hostelService.removeStudent(student.id)
            .subscribe(res => {
              this.students.splice(this.students.indexOf(student), 1);
              this.toastr.success("Student removed from hostel successfully.");
            }, e => {
              this.toastr.error("Failed to remove student.");
            });
        }
      });
  }

}
