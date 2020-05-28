import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ePriorityTask, eStatusTask, Task} from '../../../../../../assets/models/models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-change-task',
  templateUrl: './change-task.component.html',
  styleUrls: ['./change-task.component.scss']
})
export class ChangeTaskComponent implements OnInit {
  @Input() task: Task;
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
      title: [this.task.title, Validators.compose([Validators.required, Validators.maxLength(30)])],
      description: [this.task.description, Validators.maxLength(1000)],
      priority: [this.task.priority],
      status: [this.task.status]
    });
  }

  submit() {
    this.myEmitter.emit(
      {
        method: 'edit',
        task: {id: this.task.id, ...this.form.value}
      });
  }

  get title() {
    return this.form.get('title');
  }
}

