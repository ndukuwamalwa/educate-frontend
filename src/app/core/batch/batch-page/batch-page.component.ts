import { Component, OnInit } from '@angular/core';
import { back } from 'src/app/utilities';
import { ActivatedRoute } from '@angular/router';
import { BatchService } from '../batch.service';
import { ToastrService } from 'src/app/toastr.service';
import { InstituteService } from '../../institute/institute.service';
import { Subscribable } from 'rxjs';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { PRINT } from 'src/app/constants';

@Component({
  selector: 'app-batch-page',
  templateUrl: './batch-page.component.html',
  styleUrls: ['./batch-page.component.scss']
})
export class BatchPageComponent implements OnInit {
  back = back;
  isGettingBasicDetails: boolean = false;
  id: string | number;
  batch: Batch;
  academicYears: any[];
  isSavingBatch: boolean = false;
  batches: Batch[];
  isAddingStudents: boolean = false;
  students: any[];
  isGettingStudents: boolean = false;
  printUrl: SafeResourceUrl;

  constructor(
    private route: ActivatedRoute,
    private batchService: BatchService,
    private toastr: ToastrService,
    private instituteService: InstituteService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.isGettingBasicDetails = true;
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.batchService.getBatch(this.id)
        .subscribe(res => {
          this.batch = res;
          this.isGettingBasicDetails = false;
          
          this.batchService.getBatches()
            .subscribe(res => {
              this.batches = res.items.filter(batch => +batch.id !== +this.id);
            }, err => {
              this.toastr.error("Failed to load batches");
            });
        }, err => {
          this.toastr.error("Failed to get details.");
          this.isGettingBasicDetails = false;
        });
    });
    this.instituteService.getAcademicYears()
      .subscribe(res => {
        this.academicYears = res.items;
      }, err => {
        this.toastr.error("Failed to get academic years.");
      });
  }

  updateBatch(data) {
    this.isSavingBatch = true;
    data.id = this.id;
    this.batchService.update(data)
      .subscribe(res => {
        this.batch = { ...this.batch, ...data };
        this.toastr.success("Details updated successfully.");
        this.isSavingBatch = false;
      }, err => {
        this.isSavingBatch = false;
        if (err.status === 409) return this.toastr.error("New name matches an existing name.");
        this.toastr.error("Failed to save details");
      });
  }

  addStudents(data) {
    this.isAddingStudents = true;
    let addition: Subscribable<any>;
    if (data.adm) {
      addition = this.batchService.addStudentByAdm(data.adm, this.id);
    } else {
      addition = this.batchService.addFromAnotherBatch(data.batch, this.id);
    }
    addition.subscribe(res => {
      this.isAddingStudents = false;
      this.toastr.success(`${res.total} students have been added to ${this.batch.name} successfully.`);
      this.viewStudents(true);
    }, err => {
      this.isAddingStudents = false;
      if (err.status === 409) return this.toastr.error("The operation was not successful. Conflicts were encountered.");
      if (err.status === 404) return this.toastr.error("The admission number provided does not match any student.");
      this.toastr.error("Failed to add students to batch.");
    });
  }

  viewStudents(force: boolean = false) {
    if (this.students && !force) return;
    this.isGettingStudents = true;
    this.batchService.getStudents(this.id)
      .subscribe(res => {
        this.students = res;
        this.isGettingStudents = false;
      }, err => {
        this.isGettingStudents = false;
        this.toastr.error('Failed to get students.');
      });
  }

  removeStudent(id) {
    if (!window.confirm("Sure you want to remove student from class?")) return;
    this.batchService.removeStudent(id)
      .subscribe(res => {
        const removed = this.students.find(val => +val.id === id);
        const index = this.students.indexOf(removed);
        this.students.splice(index, 1);
      }, err => {
        this.toastr.error("Failed to remove student.");
      });
  }

  printStudents() {
    if (this.printUrl) return;
    this.printUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`${PRINT}/batch/students?id=${this.id}`);
  }

}
