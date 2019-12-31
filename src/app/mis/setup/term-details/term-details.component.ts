import { Component, OnInit, Inject } from '@angular/core';
import { SetupService } from '../setup.service';
import { ToastrService } from 'src/app/toastr.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-term-details',
  templateUrl: './term-details.component.html',
  styleUrls: ['./term-details.component.scss']
})
export class TermDetailsComponent implements OnInit {
  isUpdating: boolean = false;
  isLoading: boolean = false;
  constructor(
    private setupService: SetupService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public term: any
  ) { }

  ngOnInit() {
  }

  update(data) {
    this.isUpdating = true;
    this.setupService.updateTerm(data, this.term.id)
      .subscribe(res => {
        this.isUpdating = false;
        this.term = { ...this.term, ...data };
        this.toastr.success("Updated successfully");
      }, e => {
        this.isUpdating = false;
        if (e.status === 409) return this.toastr.error(e.error.message);
        return this.toastr.error("Failed to update term details.");
      });
  }

}
