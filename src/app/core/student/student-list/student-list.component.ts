import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
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
  @Output('selection') selection: EventEmitter<{ student: number, add: boolean }> = new EventEmitter();
  outView: boolean = false;
  oldView: boolean = false;
  normalView: boolean = false;
  misplacedView: boolean = false;

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
      if (this.cat === 'misplacedview') {
        this.misplacedView = true;
      }
    }
  }

  viewDetails(id) {
    this.router.navigate(['students', id]);
  }

  onSelectionChange(inp: HTMLInputElement) {
    if (inp.checked) {
      this.selection.emit({ student: +inp.value, add: true });
    } else {
      this.selection.emit({ student: +inp.value, add: false });
    }
  }

}
