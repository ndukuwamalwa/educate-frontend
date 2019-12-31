import { Component, OnInit } from '@angular/core';
import { Stream } from 'src/app/models/stream.model';
import { ClassService } from '../class.service';
import { ToastrService } from 'src/app/toastr.service';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-stream-printing',
  templateUrl: './stream-printing.component.html',
  styleUrls: ['./stream-printing.component.scss']
})
export class StreamPrintingComponent implements OnInit {
  streams: Stream[];
  url: SafeResourceUrl

  constructor(
    private classService: ClassService,
    private toastr: ToastrService,
    private sanitizer: DomSanitizer,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.classService.streams()
    .subscribe(res => {
      this.streams = res;
    }, e => {
      this.toastr.error("Unable to load streams.");
    });
  }

  onStreamChange(id) {
    const url = `${environment.apiUrl}/api/stream/print?id=${id}&token=${this.auth.token}`;
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
