import { Component, OnInit} from '@angular/core';
import {AdminService} from './admin.service';
import {ePriorityTask, eStatusTask, Pagination, Task, Tasks} from '../../../assets/models/models';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormNewTaskComponent} from './components/forms/form-new-task/form-new-task.component';
import {DialogComponent} from '../../shared/components/dialog/dialog.component';
import {CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem} from '@angular/cdk/drag-drop';
import {ChangeTaskComponent} from './components/forms/change-task/change-task.component';
import { Subject} from 'rxjs';

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
  public tasksProgress: Tasks = null;
  public tasksDone: Tasks = null;
  public dataChartObs = new Subject();
  public dataChart;
  public pagination: Pagination = {
    offset: 0,
    limit: 10,
  };
  constructor(
    private adminService: AdminService,
    private dialog: MatDialog)
  {}

  ngOnInit(): void {
    this.adminService.getTasks(this.pagination).subscribe((tasks: Tasks[]) => {
      this.tasksProgress = tasks[0];
      this.tasksDone = tasks[1];
      this.updateDataChart([...tasks[0].items, ...tasks[1].items]);
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
              dataChart[`${s[0] + p[0]}`] += 1;
            }
        });
      });
    });
    this.dataChart = dataChart;
  }

  drop(event: CdkDragDrop<any>) {

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const item: Task = event.previousContainer.data[event.previousIndex];
      event.previousContainer.data.splice(event.previousIndex, 1);
      if (item.status === eStatusTask.progress) {
        item.status = eStatusTask.done;
      } else  {
        item.status = eStatusTask.progress;
      }
      event.container.data.splice(event.currentIndex, 0, item);
    }
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
    if (task.status === this.status.done) {
      this.tasksDone.items = this.tasksDone.items.map(t => {
        if (t.id === task.id) {
          return task;
        }
        return t;
      });
    } else {
      this.tasksProgress.items = this.tasksProgress.items.map(t => {
        if (t.id === task.id) {
          return task;
        }
        return t;
      });
    }

    this.updateDataChart([...this.tasksProgress.items, ...this.tasksDone.items]);
  }

  newTask(t: Task) {
    if (t.status === this.status.done) {
      let taskGap: Task[] = this.tasksDone.items;
      taskGap.unshift( t );
      taskGap = taskGap.slice(0, taskGap.length - 1);
      this.tasksDone.items = taskGap;
    } else {
        let taskGap: Task[] = this.tasksProgress.items;
        taskGap.unshift( t );
        taskGap = taskGap.slice(0, taskGap.length - 1);
        this.tasksProgress.items = taskGap;
    }
    this.updateDataChart([...this.tasksProgress.items, ...this.tasksDone.items]);
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

  paginate(status, e) {
    if (status === this.status.done) {
      this.adminService.getTasksDone(e).subscribe((tasks) => {
        this.tasksDone.items = tasks.items;
      });
    } else {
      this.adminService.getTasksProgress(e).subscribe(tasks => {
        this.tasksProgress.items = tasks.items;
      });
    }

  }
}
