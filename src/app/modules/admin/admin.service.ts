import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Task} from '../../../assets/models/models';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient) {}
  getTasks(): Observable<any> {
    return this.http.get('/admin/tasks');
  }
}
