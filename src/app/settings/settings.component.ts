import { Component } from '@angular/core';
import { User } from 'src/interfaces/user.interface';
import { AuthService } from 'src/services/authentication.service';

@Component({
  selector: 'settings',
  templateUrl: 'settings.component.html',
  styleUrls: ['settings.component.scss']
})
export class SettingsComponent {

  user: User;

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.user = this.authService.loggedInUser;
  }

}
