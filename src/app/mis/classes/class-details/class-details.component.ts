import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Class } from 'src/app/models/class.model';
import { ToastrService } from 'src/app/toastr.service';
import { ClassService } from '../class.service';
import { Stream } from 'src/app/models/stream.model';

@Component({
  selector: 'app-class-details',
  templateUrl: './class-details.component.html',
  styleUrls: ['./class-details.component.scss']
})
export class ClassDetailsComponent implements OnInit {
  isLoading: boolean = false;
  isGettingStreams: boolean = false;
  streams: Stream[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public clas: Class,
    private toastr: ToastrService,
    private classService: ClassService
  ) { }

  ngOnInit() {
    this.isGettingStreams = true;
    this.classService.streams()
    .subscribe((streams: Stream[]) => {
      this.isGettingStreams = false;
      this.streams = streams.filter(s => s['classId'] === this.clas.id);
    }, e => {
      this.isGettingStreams = false;
      this.toastr.error("Failed to load streams.");
    });
  }

  update(clas: Class) {
    this.isLoading = true;
    this.classService.updateClass(clas, this.clas.id)
      .subscribe(res => {
        this.toastr.success("Class updated successfully.");
        this.isLoading = false;
        this.clas = { ...this.clas, ...clas };
      }, e => {
        this.isLoading = false;
        if (e.status === 409) return this.toastr.error("Class with the given level exists");
        return this.toastr.error("Failed to update class.");
      });
  }

  addStream(stream: Stream) {
    this.isLoading = true;
    stream.class = this.clas.id;
    this.classService.addStream(stream)
      .subscribe(res => {
        this.isLoading = false;
        this.toastr.success("Stream added to class");
        stream.id = res.id;
        stream.students = 0;
        this.streams.push(stream);
        this.clas.streams = +this.clas.streams;
        this.classService.fetchStreams = null;
      }, e => {
        this.isLoading = false;
        if (e.status === 409) return this.toastr.error("Stream already exists.");
        return this.toastr.error("Failed to add stream.");
      });
  }

}
