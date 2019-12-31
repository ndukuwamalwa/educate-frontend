import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthService } from 'src/app/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-student-printing',
  templateUrl: './student-printing.component.html',
  styleUrls: ['./student-printing.component.scss']
})
export class StudentPrintingComponent implements OnChanges {

  @Input('type') type: string;
  types: string[] = ['active', 'archived', 'expelled', 'suspended', 'leave'];
  url: SafeResourceUrl;
  api: string = `${environment.apiUrl}/api`;

  constructor(private sanitizer: DomSanitizer, private auth: AuthService) { }

  ngOnChanges() {
    if (this.type) {
      this.type = this.type.toLowerCase();
      if (!this.types.includes(this.type)) {
        this.type = 'active';
      }
    }
  }

  printByState({ category, startDate, endDate, adms }) {
    let params = [`type=${this.type}`];
    if (category === 'all') {
      params.push('all=true');
    } else if (category === 'adms') {
      params.push(`adms=${adms}`);
    } else {
      params.push(`startDate=${startDate}`);
      params.push(`endDate=${endDate}`);
    }
    const q = `?${params.join('&')}&token=${this.auth.token}`;
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(`${this.api}/students/print${q}`);
  }

  printByStatus({ cat }) {
    let params = [`type=${this.type}`];
    if (cat === 'all') {
      params.push('all=true');
    } else {
      params.push(`${cat}=true`);
    }
    const q = `?${params.join('&')}&token=${this.auth.token}`;
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(`${this.api}/students/print${q}`);
  }

}
