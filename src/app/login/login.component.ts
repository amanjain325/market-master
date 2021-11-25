import { Component } from '@angular/core';
import { AuthService } from 'src/services/authentication.service';
import { FireStoreService } from 'src/services/firebase.service';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent {

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit() { }

}
