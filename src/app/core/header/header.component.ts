import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticateService} from '../services/autheticate-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy {
  currentUser = false;
  constructor(private authenticationService: AuthenticateService) {
    this.authenticationService.currentUser.subscribe(user => {
      user ? this.currentUser = true : this.currentUser = false;

    });
  }

  logout() {
    this.authenticationService.logout();
  }
  ngOnDestroy(): void {
    // this.authenticationService.currentUser;
  }
}
