import { Component, OnInit, Inject } from '@angular/core';
import { Stream } from 'src/app/models/stream.model';
import { ToastrService } from 'src/app/toastr.service';
import { ClassService } from '../class.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-stream-details',
  templateUrl: './stream-details.component.html',
  styleUrls: ['./stream-details.component.scss']
})
export class StreamDetailsComponent implements OnInit {
  isLoading: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public stream: Stream,
    private toastr: ToastrService,
    private classService: ClassService
  ) { }

  ngOnInit() {
  }

  update(stream: Stream) {
    this.isLoading = true;
    this.classService.updateStream(stream, this.stream.id)
      .subscribe(res => {
        this.toastr.success("Stream updated successfully.");
        this.isLoading = false;
        this.stream = { ...this.stream, ...stream };
      }, e => {
        this.isLoading = false;
        if (e.status === 409) return this.toastr.error("Stream with the given name exists");
        return this.toastr.error("Failed to update stream.");
      });
  }
}
