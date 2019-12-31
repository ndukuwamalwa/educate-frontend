import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ExamService } from '../exam.service';
import { ToastrService } from 'src/app/toastr.service';
import { Router } from '@angular/router';
import { Term } from 'src/app/models/term.model';
import { SetupService } from '../../setup/setup.service';

@Component({
  selector: 'app-add-exam',
  templateUrl: './add-exam.component.html',
  styleUrls: ['./add-exam.component.scss']
})
export class AddExamComponent implements OnChanges, OnInit {
  @Input('title') title: string;
  @Input('type') type: string;
  @Input('isLoading') isLoading: boolean = false;
  @Input('data') data: any;
  @Output('submitted') submitted: EventEmitter<any> = new EventEmitter();
  terms: Term[];
  examForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(/^[a-z0-9 ]+$/i)]],
    type: ['', [Validators.required]],
    startDate: ['', [Validators.required]],
    endDate: ['', [Validators.required]],
    term: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]]
  });

  constructor(
    private fb: FormBuilder,
    private examService: ExamService,
    private toastr: ToastrService,
    private router: Router,
    private setupService: SetupService
  ) { }

  ngOnChanges() {
    if (this.type) {
      this.examForm.patchValue({ type: this.type });
    }
    if (this.data) {
      this.examForm.setValue({
        name: this.data.name,
        type: this.data.type,
        startDate: this.data.startDate,
        endDate: this.data.endDate,
        term: this.data.term
      });
    }
  }

  ngOnInit() {
    this.setupService.terms()
      .subscribe(res => {
        this.terms = res.items;
      }, e => {
        this.toastr.error("Failed to load terms.");
      });
  }

  submit(value) {
    if (this.data) {
      this.submitted.emit(value);
      return;
    }
    this.isLoading = true;
    this.examService.add(value)
      .subscribe(res => {
        this.isLoading = false;
        this.router.navigate(['exams', 'view', 'all']);
        this.toastr.success("Exam created successfully.");
      }, e => {
        this.isLoading = false;
        if (e.status === 409) return this.toastr.error("Exam title matches another exam.");
        return this.toastr.error("Failed to add exam.");
      });
  }

}
