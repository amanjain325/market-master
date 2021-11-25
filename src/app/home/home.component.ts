import { Component } from '@angular/core';
import { FireStoreService } from 'src/services/firebase.service';

@Component({
  selector: 'home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss']
})
export class HomeComponent {

  constructor(public _fireStoreService: FireStoreService) { }

  ngOnInit(): void {
    this._fireStoreService.get('aman').subscribe((resp) => {
      console.log(resp);
    }, (err) => {
      console.log(err);
    })
  }

}
