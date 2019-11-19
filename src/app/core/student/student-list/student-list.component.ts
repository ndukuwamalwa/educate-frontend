import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Student } from 'src/app/models/student.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit, OnChanges {
  @Input('students') students: Student[];
  @Input('cat') cat: string;
  outView: boolean = false;
  oldView: boolean = false;
  normalView: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.cat) {
      this.cat = this.cat.toLowerCase();
      if (this.cat === 'outview') {
        this.outView = true;
      }
      if (this.cat === 'oldview') {
        this.oldView = true;
      }
      if (this.cat === 'normalview') {
        this.normalView = true;
      }
    }
  }

  viewDetails(id) {
    this.router.navigate(['students', id]);
  }

}
