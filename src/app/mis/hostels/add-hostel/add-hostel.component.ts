import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HostelService } from '../hostel.service';
import { ToastrService } from 'src/app/toastr.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-hostel',
  templateUrl: './add-hostel.component.html',
  styleUrls: ['./add-hostel.component.scss']
})
export class AddHostelComponent implements OnChanges {
  @Input('title') title: string;
  @Input('isLoading') isLoading: boolean = false;
  @Input('data') data: any;
  @Output('submitted') submitted: EventEmitter<any> = new EventEmitter();
  hostelForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(/^[a-z ]/i)]],
    type: ['', [Validators.required]],
    capacity: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.min(1)]]
  });

  constructor(
    private fb: FormBuilder,
    private hostelService: HostelService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnChanges() {
    if (this.data) {
      this.hostelForm.setValue({
        name: this.data.name,
        type: this.data.type,
        capacity: this.data.capacity
      });
    }
  }

  submit(data) {
    if (this.data) {
      this.submitted.emit(data);
      return;
    }
    this.isLoading = true;
    this.hostelService.add(data)
    .subscribe(res => {
      this.isLoading = false;
      this.toastr.success("Hostel added successfully.");
      this.router.navigate(['hostels', 'view', 'list']);
    }, e => {
      this.isLoading = false;
      if (e.status === 409) return this.toastr.error("Hostel with the given name exists.");
      this.toastr.error("Failed to add hostel.");
    });
  }

}
