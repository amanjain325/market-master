import { Component } from '@angular/core';
import { AuthService } from 'src/services/authentication.service';

@Component({
  selector: 'sign-up',
  templateUrl: 'sign-up.component.html',
  styleUrls: ['sign-up.component.scss']
})
export class SignUpComponent {

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit() { }

}
