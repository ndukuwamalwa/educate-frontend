import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Subscribable } from 'rxjs';
import { TeacherService } from '../teacher.service';
import { ToastrService } from 'src/app/toastr.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from 'src/app/custom-elements/confirm/confirm.component';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.scss']
})
export class TeacherListComponent implements OnChanges {

  @Input('category') category: string;
  isLoading: boolean = false;
  columns: { key: string, label: string }[] = [
    {
      key: "empNo",
      label: "Employee no."
    },
    {
      key: "name",
      label: "Name"
    },
    {
      key: "idNo",
      label: "ID No."
    }
  ];
  total: number;
  teachers: any[];
  selected: number[] = [];
  isSavingTeachers: boolean = false;

  constructor(
    private teacherService: TeacherService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) { }

  ngOnChanges() {
    if (this.category) {
      this.getTeachers();
    }
  }

  onOptionsChange(options) {
    this.getTeachers(options);
  }

  getTeachers(options = {}) {
    this.isLoading = true;
    let subscribable: Subscribable<any>;
    if (this.category === "non-teachers") {
      subscribable = this.teacherService.nonTeachers(options)
    } else {
      subscribable = this.teacherService[this.category.toLowerCase()](options)
    }
    subscribable
      .subscribe(res => {
        this.teachers = res.items.map(t => {
          t.name = `${t.fname} ${t.lname}`;
          return t;
        });
        this.total = res.total;
        this.isLoading = false;
      }, e => {
        this.isLoading = false;
        this.toastr.error("Failed to get teachers.");
      });
  }

  check(id: number) {
    const index = this.selected.indexOf(+id);
    if (index < 0) {
      this.selected.push(id);
    } else {
      this.selected.splice(index, 1);
    }
  }

  createTeachers() {
    const conf = this.dialog.open(ConfirmComponent, {
      width: "auto",
      height: "auto",
      data: "Create teachers?"
    });
    conf.afterClosed()
      .subscribe(r => {
        if (r) {
          this.isSavingTeachers = true;
          const items = this.selected.map(employee => {
            return {
              employee
            };
          });
          this.teacherService.add(items)
            .subscribe(res => {
              this.toastr.success("Teachers created successfully.");
              this.isSavingTeachers = false;
              this.getTeachers();
              this.selected = [];
            }, e => {
              this.isSavingTeachers = false;
              this.toastr.error("Failed to create teachers.");
            });
        }
      });
  }

}
