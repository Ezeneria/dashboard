import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse
} from '@angular/common/http';

import {Observable, of, throwError} from 'rxjs';
import {delay, dematerialize, materialize, mergeMap} from 'rxjs/operators';
import {Task} from '../../../assets/models/models';

const tasks: Task[] = [
  { id: 1, status: 'progress', priority: 'high', title: 'To do test app', description: 'To do test app for company customer' },
  { id: 2, status: 'progress', priority: 'mid', title: 'Task 2', description: 'Description task 2' },
  { id: 3, status: 'progress', priority: 'low', title: 'Task 3', description: 'Description task 3' },
  { id: 4, status: 'done', priority: 'mid', title: 'Task 4', description: 'Description task 4' },
  { id: 5, status: 'done', priority: 'low', title: 'Task 5', description: 'Description task 5' },
];

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
      console.log('handed');
      switch (true) {
        case url.endsWith( '/admin/tasks') && method === 'GET' :
          return getTasks(tasks);
        default:
          return next.handle(req);
      }
    }

    function getTasks(body) {
      console.log('tasks', body);
      return of(new HttpResponse({ status: 200, body }));
    }
    // function error(message) {
    //   return throwError({ status: 400 , error: { message }});
    // }
  }
}
