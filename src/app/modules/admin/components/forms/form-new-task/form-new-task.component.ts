import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../../../../../shared/components/dialog/dialog.component';
import {ePriorityTask, eStatusTask, Task} from '../../../../../../assets/models/models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-form-new-task',
  templateUrl: './form-new-task.component.html',
  styleUrls: ['./form-new-task.component.scss']
})
export class FormNewTaskComponent implements OnInit{

  @Output() public myEmitter = new EventEmitter<any>();

  public status = [
    eStatusTask.done,
    eStatusTask.progress
  ];
  public priority = [
    ePriorityTask.low,
    ePriorityTask.mid,
    ePriorityTask.high
  ];
  public form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      title: ['', Validators.compose([Validators.required, Validators.maxLength(30)])],
      description: ['', Validators.maxLength(1000)],
      priority: [this.priority[0]],
      status: [this.status[0]]
    });
  }

  submit() {
    this.myEmitter.emit(
      {
        method: 'add',
        task: {id: 44, ...this.form.value}
      });
  }

  get title() {
    return this.form.get('title');
  }
}
