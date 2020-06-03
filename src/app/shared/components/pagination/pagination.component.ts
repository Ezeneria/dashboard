import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {of} from 'rxjs';
import {log} from 'util';
import {Pagination} from '../../../../assets/models/models';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() private initialPage = 1;
  @Input() private itemLength = 0;
  @Input() private perPage = 10;

  @Output() paginatedPage = new EventEmitter<Pagination>();

  public activePage = 0;
  public pageArray: number[] = [];

  public ngOnInit() {
    const pages = Math.ceil(this.itemLength / this.perPage);
    for (let i = 0; i < pages; i++) {
      this.pageArray.push(i + 1);
    }
  }

  paginate(i) {
    this.activePage = i;
    this.paginatedPage.emit({
      offset: i * this.perPage,
      limit: this.perPage
    });
  }

  prev() {
    this.activePage = 0;
    this.paginatedPage.emit({
      offset: 0,
      limit: this.perPage
    });
  }

  next() {
    this.activePage = this.pageArray[this.pageArray.length - 1] - 1;
    this.paginatedPage.emit({
      offset: (this.pageArray.length - 1) * this.perPage,
      limit: this.perPage
    });
  }
}
