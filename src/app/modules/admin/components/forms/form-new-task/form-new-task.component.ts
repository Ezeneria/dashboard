import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../../../../../shared/components/dialog/dialog.component';

@Component({
  selector: 'app-form-new-task',
  templateUrl: './form-new-task.component.html',
  styleUrls: ['./form-new-task.component.scss']
})
export class FormNewTaskComponent {
  @Output() public myEmitter = new EventEmitter<any>();

  addTask() {
    this.myEmitter.emit('Task added');
  }
}
