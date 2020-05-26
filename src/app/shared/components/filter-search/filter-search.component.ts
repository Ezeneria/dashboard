import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-filter-search',
  templateUrl: './filter-search.component.html',
  styleUrls: ['./filter-search.component.scss']
})
export class FilterSearchComponent {
  @Output() public searchWord: EventEmitter<string> = new EventEmitter<string>();
  public value: string;
  constructor() { }
  save() {
    this.searchWord.emit(this.value);
  }
}
