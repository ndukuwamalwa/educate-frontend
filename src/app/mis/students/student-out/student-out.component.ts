import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-student-out',
  templateUrl: './student-out.component.html',
  styleUrls: ['./student-out.component.scss']
})
export class StudentOutComponent implements OnInit {
  @Input('isLoading') isLoading: boolean = false;
  @Input('type') type: string;
  @Output('onSubmit') onSubmit: EventEmitter<{}> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  sendData(data) {
    this.type = this.type.toLowerCase();
    if (this.type === "leave") {
      data.type = "LEAVE";
    } else if (this.type === "suspension") {
      data.type = "SUSPENSION";
    } else {
    }
    this.onSubmit.emit(data);
  }

}
