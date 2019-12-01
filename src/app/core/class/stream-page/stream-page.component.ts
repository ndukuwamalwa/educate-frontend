import { Component, OnInit } from '@angular/core';
import { ClassService } from '../class.service';
import { ToastrService } from 'src/app/toastr.service';
import { back, printUrlWithToken } from 'src/app/utilities';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stream-page',
  templateUrl: './stream-page.component.html',
  styleUrls: ['./stream-page.component.scss']
})
export class StreamPageComponent implements OnInit {
  stream: any;
  back = back;
  isGettingBasicDetails: boolean = false;
  id: number | string;
  isSavingStream: boolean = false;
  isAddingStudents: boolean = false;
  isLoadingUnstreamed: boolean = false;
  unstreamedStudents: any[];
  studentsToAdd: any[] = [];
  isGettingStudents: boolean = false;
  students: any[];
  printUrl: SafeResourceUrl;

  constructor(
    private classService: ClassService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.isGettingBasicDetails = true;
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.classService.getStream(this.id)
        .subscribe(res => {
          this.stream = res;
          this.id = res.id;
          this.isGettingBasicDetails = false;
        }, err => {
          this.toastr.error("Failed to get details.");
          this.isGettingBasicDetails = false;
        });
    });
  }

  viewStudents() {
    this.isGettingStudents = true;
    this.classService.getStreamStudents(this.id)
      .subscribe(res => {
        this.students = res;
        this.isGettingStudents = false;
      }, err => {
        this.isGettingStudents = false;
        this.toastr.error("Failed to load students.");
      });
  }

  printStudents() {
    if (this.printUrl) return;
    this.printUrl = this.sanitizer.bypassSecurityTrustResourceUrl(printUrlWithToken(`/stream/students?id=${this.id}`));
  }

  updateStream({ name }) {
    this.isSavingStream = true;
    this.classService.updateStream({ name, id: this.id })
      .subscribe(res => {
        this.toastr.success("Stream updated successfully.");
        this.isSavingStream = false;
        this.stream.name = name;
      }, err => {
        this.isSavingStream = false;
        if (err.status === 409) return this.toastr.error("Stream with the given name exists");
        this.toastr.error("Failed to update stream.");
      });
  }

  addStudents(data) {
    this.isAddingStudents = true;
    const students = this.studentsToAdd.map(val => {
      return { stream: this.id, student: val };
    });
    this.classService.addStreamStudents(students)
      .subscribe(res => {
        this.toastr.success(`Students added to stream successfully.`);
        this.isAddingStudents = false;
        this.studentsToAdd = [];
        this.loadUnstreamed();
      }, err => {
        this.isAddingStudents = false;
        if (err.status === 409) return this.toastr.error("Some conflicts were found. Operation succeeded");
        this.toastr.error("Failed to add students.");
      });
  }

  loadUnstreamed() {
    this.isLoadingUnstreamed = true;
    this.classService.getUnstreamed(this.stream.classId)
      .subscribe(res => {
        this.isLoadingUnstreamed = false;
        this.unstreamedStudents = res;
      }, err => {
        this.isLoadingUnstreamed = false;
        this.toastr.error("Failed to load students.");
      });
  }

  onSelectChange(inp: HTMLInputElement) {
    if (inp.checked) {
      this.studentsToAdd.push(+inp.value);
    } else {
      const i = this.studentsToAdd.indexOf(this.studentsToAdd.find(v => +v === +inp.value));
      this.studentsToAdd.splice(i, 1);
    }
  }

  removeStudent(id: string) {
    if (!confirm("Are you sure you want to remove the student from this stream?")) return;
    this.classService.removeStreamStudent(id)
      .subscribe(res => {
        const i = this.students.indexOf(this.students.find(val => +val.id === +id));
        this.students.splice(i, 1);
        this.toastr.error("Student removed successfully.");
      }, err => {
        this.toastr.error("Failed to remove student from the stream.");
      });
  }

}
