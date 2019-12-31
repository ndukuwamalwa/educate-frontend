import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SetupService } from '../setup.service';
import { ToastrService } from 'src/app/toastr.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-term',
  templateUrl: './add-term.component.html',
  styleUrls: ['./add-term.component.scss']
})
export class AddTermComponent implements OnChanges {
  @Input('isLoading') isLoading: boolean = false;
  @Input('data') data: any;
  @Output('submitted') submitted: EventEmitter<any> = new EventEmitter();
  currentYear: number = new Date().getFullYear();
  termForm = this.fb.group({
    startDate: ['', [Validators.required]],
    endDate: ['', [Validators.required]],
    year: [this.currentYear, [Validators.required, Validators.min(this.currentYear)]]
  });

  constructor(
    private fb: FormBuilder,
    private setupService: SetupService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnChanges() {
    if (this.data) {
      this.termForm.setValue({ startDate: this.data.startDate, endDate: this.data.endDate, year: this.data.year });
    }
  }

  save(term) {
    if (this.data) {
      this.submitted.emit(term);
      return;
    }
    this.isLoading = true;
    this.setupService.addTerm(term)
      .subscribe(res => {
        this.toastr.success("Term set up successfully.");
        this.isLoading = false;
        this.router.navigate(['setup', 'view', 'list']);
      }, e => {
        this.isLoading = false;
        if (e.status === 409) return this.toastr.error(e.error.message);
        return this.toastr.error("Failed to configure term. Please retry.");
      });
  }

}
