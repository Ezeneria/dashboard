import {ChangeDetectorRef, Component, EventEmitter, OnInit} from '@angular/core';
import {AdminService} from './admin.service';
import {eStatusTask, Task} from '../../../assets/models/models';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormNewTaskComponent} from './components/forms/form-new-task/form-new-task.component';
import {DialogComponent} from '../../shared/components/dialog/dialog.component';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {ChangeTaskComponent} from './components/forms/change-task/change-task.component';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  public search: string;
  public status = eStatusTask;
  public tasks: Task[] = [];
  constructor(
    private adminService: AdminService,
    private dialog: MatDialog)
  {}

  ngOnInit(): void {
    this.adminService.getTasks().subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });
  }

  addTask(e) {
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
  changeTask(e) {
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

  closeDialog(dialogRef: MatDialogRef<any>) {
    dialogRef.afterOpened()
      .subscribe(() => {
        const subs = dialogRef.componentInstance[`myEmitter`]
          .subscribe((result) => {
            console.log(result);
            dialogRef.close();
            dialogRef.afterClosed().subscribe(() => {
              console.log('unsubscribed'); subs.unsubscribe();
            });
          });
      });
  }
  searchResult(e) {
    this.search = e;
  }
}
