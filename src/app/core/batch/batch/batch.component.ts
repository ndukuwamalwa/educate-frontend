import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InstituteService } from '../../institute/institute.service';
import { ToastrService } from 'src/app/toastr.service';
import { BatchService } from '../batch.service';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { PRINT } from 'src/app/constants';

@Component({
  selector: 'app-batch',
  templateUrl: './batch.component.html',
  styleUrls: ['./batch.component.scss']
})
export class BatchComponent implements OnInit {
  students: any[] = [];
  teachers: any[] = [];
  total: number;
  batches: Batch[];
  isGettingBatches: boolean = false;
  academicYears: any[];
  isSavingBatch: boolean = false;
  printUrl: SafeResourceUrl;

  constructor(
    private router: Router,
    private instituteService: InstituteService,
    private toastr: ToastrService,
    private batchService: BatchService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.instituteService.getAcademicYears()
    .subscribe(res => {
      this.academicYears = res.items;
    }, err => {
      this.toastr.error("Failed to get academic years.");
    });
  }

  viewDetails(id) {
    this.router.navigate(['batch', id]);
  }

  onOptionsChange(options) {
    this.getBatches(options, true);
  }

  getBatches(options = {}, force: boolean = false) {
    if (this.batches && !force) return;
    this.isGettingBatches = true;
    this.batchService.getBatches(options)
      .subscribe(res => {
        this.total = res.total;
        this.batches = res.items;
        this.isGettingBatches = false;
      }, err => {
        this.toastr.error("Failed to load batches.");
        this.isGettingBatches = false;
      });
  }

  addBatch(data) {
    this.isSavingBatch = true;
    this.batchService.add(data)
      .subscribe(res => {
        this.toastr.success("Batch added successfully.");
        this.getBatches({}, true);
        this.isSavingBatch = false;
        this.router.navigate(['batch', res.id]);
      }, err => {
        this.isSavingBatch = false;
        if (err.status === 409) return this.toastr.error("Batch already exists.");
        this.toastr.error("Failed to add batch.");
      });
  }

  print() {
    if (this.printUrl) return;
    this.printUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`${PRINT}/batches`);
  }

}
