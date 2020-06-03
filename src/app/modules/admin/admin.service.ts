import { Injectable } from '@angular/core';
import {forkJoin, Observable, of} from 'rxjs';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Pagination, Task, Tasks} from '../../../assets/models/models';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient) {}

  createPagination(p) {
    let pagination: Pagination = p;
    if (!p) {
      pagination = {
        offset: 0,
        limit: 0
      };
    }
    return pagination;
  }

  getTasksDone(p?: Pagination): Observable<Tasks> {
    const pagination = this.createPagination(p);
    return this.http.post<Tasks>('/admin/tasks/done', pagination);
  }

  getTasksProgress(p?: Pagination): Observable<Tasks> {
    const pagination = this.createPagination(p);
    return this.http.post<Tasks>('/admin/tasks/progress', pagination);
  }

  getTasks(p): Observable<Tasks[]> {
    const pagination: Pagination = p;
    const taskDone: Observable<Tasks> = this.getTasksDone(pagination);
    const taskProgress: Observable<Tasks> = this.getTasksProgress(pagination);
    return forkJoin([taskProgress, taskDone]);
  }

  changeTask(task: Task): Observable<any> {
    return this.http.post('/admin/tasksChange', task);
  }
}
