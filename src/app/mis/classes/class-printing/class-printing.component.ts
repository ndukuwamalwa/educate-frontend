import { Component, OnInit } from '@angular/core';
import { Class } from 'src/app/models/class.model';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { ClassService } from '../class.service';
import { ToastrService } from 'src/app/toastr.service';
import { AuthService } from 'src/app/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-class-printing',
  templateUrl: './class-printing.component.html',
  styleUrls: ['./class-printing.component.scss']
})
export class ClassPrintingComponent implements OnInit {
  classes: Class[];
  url: SafeResourceUrl

  constructor(
    private classService: ClassService,
    private toastr: ToastrService,
    private sanitizer: DomSanitizer,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.classService.classes()
      .subscribe(res => {
        this.classes = res;
      }, e => {
        this.toastr.error("Unable to load classes.");
      });
  }

  onClassChange(id) {
    const url = `${environment.apiUrl}/api/class/print?id=${id}&token=${this.auth.token}`;
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
