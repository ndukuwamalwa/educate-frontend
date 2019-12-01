import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'src/app/toastr.service';
import { ClassService } from '../class.service';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss']
})
export class ClassComponent implements OnInit {
  students: any[] = [];
  teachers: any[] = [];
  total: number;
  classes: Class[];
  isGettingClasses: boolean = false;
  isSavingClass: boolean = false;
  levels: number[] = [];
  streams: any[];
  isGettingStreams: boolean = false;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private clasService: ClassService,
  ) { }

  ngOnInit() {
    this.getClasses();
  }

  viewDetails(id) {
    this.router.navigate(['class', id]);
  }

  onOptionsChange(options) {
    this.getClasses(options, true);
  }

  getClasses(options = {}, force: boolean = false) {
    if (this.classes && !force) return;
    this.isGettingClasses = true;
    this.clasService.getClasses(options)
      .subscribe(res => {
        this.total = res.total;
        this.classes = res.items;

        this.isGettingClasses = false;
      }, err => {
        this.toastr.error("Failed to load clases.");
        this.isGettingClasses = false;
      });
  }

  addClass(data) {
    this.isSavingClass = true;
    this.clasService.add(data)
      .subscribe(res => {
        this.toastr.success("Class added successfully.");
        this.getClasses({}, true);
        this.isSavingClass = false;
        this.router.navigate(['class', res.id]);
      }, err => {
        this.isSavingClass = false;
        if (err.status === 409) return this.toastr.error("Class already exists.");
        this.toastr.error("Failed to add clas.");
      });
  }

  createLevels({ start, end }) {
    start = +start;
    end = +end;
    if (start > end) {
      alert("Start cannot be greater than end.");
      return;
    }
    this.levels = [];
    for (let i = start; i <= end; i++) {
      this.levels.push(i);
    }
  }

  createClasses(classes) {
    this.isSavingClass = true;
    const toSave = [];
    const keys = Object.keys(classes);
    for (let key of keys) {
      let level = +key.split('_')[1];
      let fees = +classes[key];
      toSave.push({ level, fees });
    }
    this.clasService.add(toSave, true)
      .subscribe(res => {
        this.isSavingClass = false;
        this.getClasses({}, true);
        this.levels = [];
        this.toastr.success("Classes created and saved successfully.");
      }, err => {
        this.isSavingClass = false;
        if (err.status === 409) return this.toastr.error("Failed to save classes. Duplicates were found.");
        this.toastr.error("Unable to save classes.");
      });
  }

  getStreams(force: boolean = false) {
    if (!force && this.streams) return;
    this.isGettingStreams = true;
    this.clasService.getStreams()
      .subscribe(res => {
        this.streams = res.items;
        this.isGettingStreams = false;
      }, err => {
        this.isGettingStreams = false;
        this.toastr.error("Unable to get streams.");
      });
  }

  viewStream(id) {
    this.router.navigate(["class", "stream", id]);
  }

  promote() {
    const confirm = window.confirm("Are you sure you want to perform a promotion? This operation is irreversible.");
    if (!confirm) return;
    const answer = window.prompt("What is 3 + 4?");
    if (+answer !== 7) return alert("Human check failed.");
    this.clasService.promote()
      .subscribe(res => {
        this.toastr.success("Promotion was successful.");
      }, e => {
        this.toastr.error("Failed to promote students.");
      });
  }

}
