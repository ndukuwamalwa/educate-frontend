import { Component, OnInit } from '@angular/core';
import { Class } from 'src/app/models/class.model';
import { ClassService } from '../class.service';
import { ToastrService } from 'src/app/toastr.service';
import { MatDialog } from '@angular/material/dialog';
import { ClassDetailsComponent } from '../class-details/class-details.component';
import { ConfirmComponent } from 'src/app/custom-elements/confirm/confirm.component';

@Component({
  selector: 'app-view-classes',
  templateUrl: './view-classes.component.html',
  styleUrls: ['./view-classes.component.scss']
})
export class ViewClassesComponent implements OnInit {
  isLoading: boolean = false;
  classes: Class[];

  constructor(
    private classService: ClassService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.classService.classes()
      .subscribe(res => {
        this.classes = res;
        this.isLoading = false;
      }, e => {
        this.isLoading = false;
        this.toastr.error("Failed to load classes");
      });
  }

  viewClass(nodeName: string, clas: Class) {
    if (nodeName.toLowerCase() !== "td") return;
    const dialog = this.dialog.open(ClassDetailsComponent, {
      minWidth: "70%",
      height: "60%",
      data: clas
    });
    dialog.afterClosed()
      .subscribe(r => {
        if (r) {
          this.classes.splice(this.classes.indexOf(clas), 1, r);
        }
      });
  }

  delete(clas: Class) {
    const confirm = this.dialog.open(ConfirmComponent, {
      width: "300px",
      height: "150px",
      data: "Delete class?"
    });
    confirm.afterClosed()
      .subscribe(r => {
        if (r) {
          this.classService.deleteClass(clas.id)
            .subscribe(res => {
              this.toastr.success("Class deleted successfully.");
              this.classes.splice(this.classes.indexOf(clas), 1);
            });
        }
      }, e => {
        if (e.status === 409) return this.toastr.error("Cannot delete class with students/streams");
        return this.toastr.error("Failed to delete class/");
      });
  }

}
