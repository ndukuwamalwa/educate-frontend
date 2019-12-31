import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnChanges {
  @Input('total') total: number;
  @Input('sorts') sorts: string[];
  @Input('shown') shown: number;
  size: number = 50;
  page: number = 1;
  pages: number[];
  sortBy: string = 'id';
  sort: number = -1;
  search: string = '';
  @Output('output') output: EventEmitter<any> = new EventEmitter();

  constructor() { }

  calculatePages() {
    let totalPages = Math.ceil(this.total/this.size);
    if (totalPages === 0) {
      totalPages = 1;
    }
    this.pages = [];
    for (let i = 1; i <= totalPages; i ++) {
      this.pages.push(i);
    }
    this.page = 1;
  }

  ngOnChanges() {
    if (this.total && this.sorts) {
      this.calculatePages();
    }
  }

  onPageSizeChange(val) {
    this.size = +val;
    this.calculatePages();
    this.sendChange();
  }

  onSearch(e, keyword) {
    if (e.code && e.code.toLowerCase() !== "enter") return;
    this.search = keyword;
    this.sendChange();
  }

  onPageChange(page) {
    this.page = +page;
    this.sendChange();
  }

  onSortByChange(sortBy) {
    this.sortBy = sortBy;
    this.sendChange();
  }

  onSortChange(sort) {
    this.sort = +sort;
    this.sendChange();
  }

  prev() {
    if (this.page !== 1) {
      this.page -= 1;
      this.sendChange();
    }
  }

  next() {
    if (this.page !== this.pages[this.pages.length - 1]) {
      this.page += 1;
      this.sendChange();
    }
  }

  sendChange() {
    const change = {
      size: this.size,
      page: this.page,
      sort: this.sort,
      sortBy: this.sortBy,
      keyword: this.search
    };
    this.output.emit(change);
  }

}
