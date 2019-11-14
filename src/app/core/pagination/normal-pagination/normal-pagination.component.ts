import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-normal-pagination',
  templateUrl: './normal-pagination.component.html',
  styleUrls: ['./normal-pagination.component.scss']
})
export class NormalPaginationComponent implements OnChanges {
  @Input('total') total: number;
  @Input('sorts') sorts: string[];
  size: number = 80;
  page: number = 1;
  pages: number[];
  sortBy: string = 'id';
  sort: number = -1;
  search: string = '';
  @Output('options') options: EventEmitter<any> = new EventEmitter();

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

  onSearch(keyword) {
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

  lastPage(): boolean {
    if (!this.pages) return true;
    if (this.pages[this.pages.length - 1] === this.page) {
      return true;
    }
    return false;
  }

  firstPage(): boolean {
    if (!this.pages) return true;
    if (this.pages[0] === this.page) {
      return true;
    }
    return false;
  }

  prev() {
    if (!this.firstPage()) {
      this.page -= 1;
      this.sendChange();
    }
  }

  next() {
    if (!this.lastPage()) {
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
      search: this.search
    };
    this.options.emit(change);
  }

}
