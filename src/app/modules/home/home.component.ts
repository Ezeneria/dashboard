import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticateService} from '../../core/services/autheticate-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authenticateService: AuthenticateService) {
    if (this.authenticateService.currentUserValue) {
      this.router.navigate(['/admin']);
    }
  }

  submit(event) {
    event.preventDefault();
    this.authenticateService.login(this.form.value);
  }

  ngOnInit(): void {
    this.authenticateService.currentUser.subscribe(user => console.log('current user', user));
    this.form = this.fb.group({
      username: [null, Validators.compose([Validators.minLength(6), Validators.required])],
      password: [null, Validators.compose([Validators.minLength(8), Validators.required])]
    });
  }

}
