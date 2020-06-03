import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse
} from '@angular/common/http';

import {Observable, of, throwError} from 'rxjs';
import {delay, dematerialize, materialize, mergeMap} from 'rxjs/operators';
import { taskDone, tasksProgress} from './../../../assets/static-data/data';
import {Pagination, Task} from '../../../assets/models/models';


@Injectable()
export class AdminInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, body, headers} = req;
    return of(null)
      .pipe(
        mergeMap(handleRequest),
        materialize(),
        delay(500),
        dematerialize());

    function handleRequest() {
      switch (true) {
        case url.endsWith( '/admin/tasks/progress') && method === 'POST' :
          return getTasks(tasksProgress, tasksProgress.length, body);
        case url.endsWith( '/admin/tasks/done') && method === 'POST' :
          return getTasks(taskDone, taskDone.length, body);
        default:
          return next.handle(req);
      }
    }

    function getTasks(tasks: Task[], total: number, pagination: Pagination) {
      let t = [];
      if (pagination.limit !== 0 && pagination.offset === 0) {
        t = tasks.slice(0, pagination.limit);
      } else if (pagination.limit !== 0 && pagination.offset !== 0) {
        t = tasks.slice(pagination.offset, pagination.offset + pagination.limit);
      } else {
        t = tasks;
      }
      return of(new HttpResponse({ status: 200, body: {
          items: t,
          total
        } }));
    }
  }
}
