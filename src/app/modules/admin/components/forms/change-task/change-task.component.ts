import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Task} from '../../../../../../assets/models/models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-change-task',
  templateUrl: './change-task.component.html',
  styleUrls: ['./change-task.component.scss']
})
export class ChangeTaskComponent implements OnInit {
  @Input() task: Task;
  @Output() public myEmitter = new EventEmitter<any>();

  public form: FormGroup;
  constructor(private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      title: [this.task.title, Validators.compose([Validators.required, Validators.maxLength(30)])],
      description: ['', Validators.compose([Validators.required, Validators.maxLength(1000)])],
      priority: [''],
      status: ['']
    });
  }

  changeTask() {
    this.myEmitter.emit(this.task);
  }

  submit() {}

  checkForm() {
    console.log(this.form);
  }
  get title() {
    return this.form.get('title');
  }
}

