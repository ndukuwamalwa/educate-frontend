import { Component, OnInit } from '@angular/core';
import { back, printUrlWithToken } from 'src/app/utilities';
import { ActivatedRoute } from '@angular/router';
import { ClassService } from '../class.service';
import { ToastrService } from 'src/app/toastr.service';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-class-page',
  templateUrl: './class-page.component.html',
  styleUrls: ['./class-page.component.scss']
})
export class ClassPageComponent implements OnInit {
  back = back;
  isGettingBasicDetails: boolean = false;
  id: string | number;
  clas: Class;
  isSavingClass: boolean = false;
  classes: Class[];
  students: any[];
  isGettingStudents: boolean = false;
  printUrl: SafeResourceUrl;
  isAddingStream: boolean = false;
  streams: any[];
  isGettingStreams: boolean = false;
  totalStudents: number;

  constructor(
    private route: ActivatedRoute,
    private classService: ClassService,
    private toastr: ToastrService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.isGettingBasicDetails = true;
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.classService.getClass(this.id)
        .subscribe(res => {
          this.clas = res;
          this.isGettingBasicDetails = false;

          this.classService.getClasses()
            .subscribe(res => {
              this.classes = res.items.filter(clas => +clas.id !== +this.id);
            }, err => {
              this.toastr.error("Failed to load classes");
            });
        }, err => {
          this.toastr.error("Failed to get details.");
          this.isGettingBasicDetails = false;
        });
    });
  }

  updateClass(data) {
    this.isSavingClass = true;
    data.id = this.id;
    this.classService.update(data)
      .subscribe(res => {
        this.clas = { ...this.clas, ...data };
        this.toastr.success("Details updated successfully.");
        this.isSavingClass = false;
      }, err => {
        this.isSavingClass = false;
        if (err.status === 409) return this.toastr.error("New name matches an existing name.");
        this.toastr.error("Failed to save details");
      });
  }

  viewStudents(options = {}, force: boolean = false) {
    if (this.students && !force) return;
    this.isGettingStudents = true;
    this.classService.getStudents(this.id, options)
      .subscribe(res => {
        this.students = res.items;
        this.totalStudents = res.total;
        this.isGettingStudents = false;
      }, err => {
        this.isGettingStudents = false;
        this.toastr.error('Failed to get students.');
      });
  }

  onOptionsChange(options) {
    this.viewStudents(options, true);
  }

  removeStudent(id) {
    if (!window.confirm("Sure you want to remove student from class?")) return;
    this.classService.removeStudent(id)
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
    this.printUrl = this.sanitizer.bypassSecurityTrustResourceUrl(printUrlWithToken(`/class/students?id=${this.id}`));
  }

  addStream(streamForm: NgForm) {
    this.isAddingStream = true;
    streamForm.value.class = this.id;
    this.classService.addStream(streamForm.value)
      .subscribe(res => {
        this.viewStreams(true);
        streamForm.reset();
        this.isAddingStream = false;
        this.toastr.success("Stream created successfully.");
      }, err => {
        this.isAddingStream = false;
        if (err.status === 409) return this.toastr.error("Stream already exists.");
        this.toastr.error("Failed to create stream.");
      });
  }

  viewStreams(force: boolean = false) {
    if (this.streams && !force) return;
    this.isGettingStreams = true;
    this.classService.getStreams(this.id)
      .subscribe(res => {
        this.streams = res;
        this.isGettingStreams = false;
      }, err => {
        this.toastr.error(`Failed to load streams.`);
        this.isGettingStreams = false;
      });
  }

}
