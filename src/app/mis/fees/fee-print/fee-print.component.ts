import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ClassService } from '../../classes/class.service';
import { ToastrService } from 'src/app/toastr.service';
import { FeeService } from '../fee.service';
import { Stream } from 'src/app/models/stream.model';
import { Class } from 'src/app/models/class.model';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-fee-print',
  templateUrl: './fee-print.component.html',
  styleUrls: ['./fee-print.component.scss']
})
export class FeePrintComponent implements OnChanges {
  @Input('category') category: string;
  streams: Stream[];
  classes: Class[];
  url: SafeResourceUrl;

  constructor(
    private classService: ClassService,
    private toastr: ToastrService,
    private auth: AuthService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnChanges() {
    if (this.category) {
      if (this.category === "stream") {
        this.classService.streams()
          .subscribe(r => {
            this.streams = r;
          }, e => {
            this.toastr.error("Failed to load streams.");
          });
      } else {
        this.classService.classes()
          .subscribe(r => {
            this.classes = r;
          }, e => {
            this.toastr.error("Failed to load classes.");
          });
      }
    }
  }

  onChange(id) {
    let url = `${environment.apiUrl}/api/fees/${this.category.toLowerCase()}/print?id=${id}&token=${this.auth.token}`;
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
