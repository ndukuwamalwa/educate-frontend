import { Component, OnInit, Inject } from '@angular/core';
import { SubjectService } from '../subject.service';
import { Subject } from 'src/app/models/subject.model';
import { ToastrService } from 'src/app/toastr.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-subject-details',
  templateUrl: './subject-details.component.html',
  styleUrls: ['./subject-details.component.scss']
})
export class SubjectDetailsComponent implements OnInit {
  isLoading: boolean = false;

  constructor(
    private subjectService: SubjectService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public subject: Subject
  ) { }

  ngOnInit() {
  }

  update(subject: Subject) {
    this.isLoading = true;
    this.subjectService.update(subject, this.subject.id)
      .subscribe(res => {
        this.isLoading = false;
        this.toastr.success("Subject updated successfully.");
        this.subject = { ...this.subject, ...subject };
      }, e => {
        this.isLoading = false;
        if (e.status === 409) return this.toastr.error("Subject name already used.");
        return this.toastr.error("Failed to update subject.");
      });
  }

}
