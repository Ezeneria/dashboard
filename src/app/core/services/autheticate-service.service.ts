import { Injectable } from '@angular/core';
import {User} from '../../../assets/models/models';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(user): Observable<User> {
    return this.http.post('/users/authenticate', user  )
      .pipe(map((userHttp: User) => {
        if (userHttp && userHttp.token) {
          localStorage.setItem('currentUser', JSON.stringify(userHttp));
          this.currentUserSubject.next(userHttp);
          this.router.navigate(['/admin']);
        }

        return userHttp;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
}
