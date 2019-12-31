import { Component, OnInit } from '@angular/core';
import { HostelService } from '../hostel.service';
import { ToastrService } from 'src/app/toastr.service';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { AuthService } from 'src/app/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-print-hostel-students',
  templateUrl: './print-hostel-students.component.html',
  styleUrls: ['./print-hostel-students.component.scss']
})
export class PrintHostelStudentsComponent implements OnInit {
  hostels: any[];
  url: SafeResourceUrl;

  constructor(
    private hostelService: HostelService,
    private toastr: ToastrService,
    private sanitizer: DomSanitizer,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.hostelService.list()
    .subscribe(res => {
      this.hostels = res;
    }, e => {
      this.toastr.error("Faile to load hostels");
    });
  }

  onHostelChange(hostel) {
    const base = `${environment.apiUrl}/api/hostels/students/print?id=${hostel}&token=${this.auth.token}`;
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(base);
  }

}
