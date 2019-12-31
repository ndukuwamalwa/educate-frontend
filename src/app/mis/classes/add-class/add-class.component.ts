import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Class } from 'src/app/models/class.model';
import { ToastrService } from 'src/app/toastr.service';
import { ClassService } from '../class.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.scss']
})
export class AddClassComponent implements OnChanges {
  @Input('isLoading') isLoading: boolean = false;
  @Input('title') title: string = "Create class";
  @Input('data') data: any;
  @Output('submitted') submitted: EventEmitter<Class> = new EventEmitter();
  classForm = this.fb.group({
    level: ['', [Validators.required, Validators.min(1)]],
    fees: ['', [Validators.required, Validators.min(0)]],
    description: ['', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private classService: ClassService,
    private router: Router
  ) { }

  ngOnChanges() {
    if (this.data) {
      this.classForm.setValue({
        level: this.data.level,
        fees: this.data.fees,
        description: this.data.description
      });
    }
  }

  addClass(clas: Class) {
    if (this.data) {
      this.submitted.emit(clas);
      return;
    }
    this.isLoading = true;
    this.classService.addClass(clas)
      .subscribe(res => {
        this.isLoading = false;
        this.toastr.success("Class added successfully.");
        this.router.navigate(['classes', 'view', 'classes']);
      }, e => {
        this.isLoading = false;
        if (e.status === 409) return this.toastr.error("Class already exists with the same level.");
        return this.toastr.error("Failed to add class");
      });
  }

}
