import {ChangeDetectorRef, Component, EventEmitter, OnInit} from '@angular/core';
import {AdminService} from './admin.service';
import {ePriorityTask, eStatusTask, Task} from '../../../assets/models/models';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormNewTaskComponent} from './components/forms/form-new-task/form-new-task.component';
import {DialogComponent} from '../../shared/components/dialog/dialog.component';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {ChangeTaskComponent} from './components/forms/change-task/change-task.component';
import {Observable, Subject} from 'rxjs';

interface MethodTask {
  method: string;
  task: Task;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit {
  public search: string;
  public status = eStatusTask;
  public tasks: Task[] = [];

  public dataChartObs = new Subject();
  constructor(
    private adminService: AdminService,
    private dialog: MatDialog)
  {}

  ngOnInit(): void {
    this.adminService.getTasks().subscribe((tasks: Task[]) => {
      this.tasks = tasks;
      this.updateDataChart(tasks);
    });
  }

  updateDataChart(data: Task[]) {
    const dataChart = {};
    Object.entries(eStatusTask).forEach((s) => {
      Object.entries(ePriorityTask).forEach((p) => {
        data.forEach((t) => {
            if (!dataChart[`${s[0] + p[0]}`]) {
              dataChart[`${s[0] + p[0]}`] = 0;
            }
            if (s[0] === t.status && p[0] === t.priority){
              console.log('asdasd');
              dataChart[`${s[0] + p[0]}`] += 1;
            }
        });
      });
    });
    this.dataChartObs.next(dataChart);
  }
  addTaskDialog(e) {
    const dialogRef = this.dialog.open(DialogComponent, {
      panelClass: 'modal-material-template',
      data: {
        title: 'Modal title',
        component: FormNewTaskComponent,
        inputs: {
          text: 'Change task',
        }
      },
      autoFocus: false,
      width: '800px',
      height: '400px'
    });

    this.closeDialog(dialogRef);
  }

  changeTaskDialog(e) {
    const dialogRef = this.dialog.open(DialogComponent, {
      panelClass: 'modal-material-template',
      data: {
        title: 'Modal title',
        component: ChangeTaskComponent,
        inputs: {
          text: 'Change task',
          task: e
        }
      },
      autoFocus: false,
      width: '800px',
      height: '400px'
    });

    this.closeDialog(dialogRef);
  }

  changeTask(task: Task) {
    this.tasks = this.tasks.map(t => {
      if (t.id === task.id) {
        return task;
      }
      return t;
    });
    this.updateDataChart(this.tasks);
  }

  newTask(task: Task) {
    //тут так же делаем post запрос на добавление
    this.tasks.push(task);
    this.updateDataChart(this.tasks);
  }

  closeDialog(dialogRef: MatDialogRef<any>) {
    dialogRef.afterOpened()
      .subscribe(() => {
        const subs = dialogRef.componentInstance[`myEmitter`]
          .subscribe((result: MethodTask) => {
            switch (result.method) {
              case 'edit':
                this.changeTask(result.task);
                dialogRef.close();
                dialogRef.afterClosed().subscribe(() => subs.unsubscribe());
                break;
              case 'add':
                this.newTask(result.task);
                dialogRef.close();
                dialogRef.afterClosed().subscribe(() => subs.unsubscribe());
                break;
            }
          });
      });
  }
  searchResult(e) {
    this.search = e;
  }
}
