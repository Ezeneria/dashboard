import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Task} from '../../../../../../assets/models/models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-change-task',
  templateUrl: './change-task.component.html',
  styleUrls: ['./change-task.component.scss']
})
export class ChangeTaskComponent implements OnInit{
  @Input() task: Task;
  @Output() public myEmitter = new EventEmitter<any>();

  public form: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.compose([Validators.required, Validators.maxLength(100)])],
      description: ['', Validators.compose([Validators.required, Validators.maxLength(1000)])],
      priority: [''],
      status: ['']
    });
  }
  changeTask() {
    this.myEmitter.emit(this.task);
  }
  ngOnInit(): void {
    console.log(this.task);
    this.form.valueChanges.subscribe(value => console.log(value));
  }
}

