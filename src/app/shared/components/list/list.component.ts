import {Component, EventEmitter, Input, Output} from '@angular/core';
import { Task } from '../../../../assets/models/models';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  @Input() public list: Task[];
  @Output() public changedTask: EventEmitter<Task> = new EventEmitter<Task>();
  openTask(task: Task) {
    this.changedTask.emit(task);
  }
  trackByFn(index, item) {
    return item.id;
  }
}
