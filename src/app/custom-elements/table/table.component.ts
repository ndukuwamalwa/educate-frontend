import { Component, OnInit, Input, OnChanges, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges {

  @Input('headers') headers: {key: string, label: string}[];
  @Input('rows') rows: any[];
  @Input('checkKey') checkKey: string;
  @Output('onchecked') onchecked: EventEmitter<any> = new EventEmitter();
  @Output('rowClicked') rowClicked: EventEmitter<any> = new EventEmitter();
  includeCheck: boolean;
  selected: any[] = [];

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.checkKey) {
      this.includeCheck = true;
    }
  }

  onSelect(val) {
    const index = this.selected.indexOf(val);
    if (index === -1) {
      this.selected.push(val);
      this.onchecked.emit(this.selected);
    } else {
      this.selected.splice(index, 1);
      this.onchecked.emit(this.selected);
    }
  }

  onRowClick(event, row) {
    if (event.target.nodeName.toLowerCase() === "td") {
      this.rowClicked.emit(row);
    }
  }

}
