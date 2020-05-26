import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse
} from '@angular/common/http';

import {Observable, of, throwError} from 'rxjs';
import {delay, dematerialize, materialize, mergeMap} from 'rxjs/operators';
import {User} from '../../../assets/models/models';

const users: User[] = [
  { id: 1, username: 'user1', password: 'qwertyu1', firstName: 'Slava', lastName: 'Kekov' },
  { id: 2, username: 'user2', password: '12345678', firstName: 'Fedor', lastName: 'Lolov' }
];

@Injectable()
export class BackendInterceptor implements HttpInterceptor {
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
        case url.endsWith( '/users/authenticate') && method === 'POST' :
          return authenticate();
        default:
          return next.handle(req);
      }
    }

    function authenticate() {
      console.log('authenticated');
      const { username, password }: User = body;
      const user = users.find(x => x.username === username && x.password === password);

      if (!user) { return error('User was not found'); }
      return resolve({
        ...user,
        token: `fakeToken.${user.id}`
      });
    }

    function resolve(body: User) {
      return of(new HttpResponse({ status: 200, body }));
    }
    function error(message) {
      return throwError({ status: 400 , error: { message }});
    }
  }
}
