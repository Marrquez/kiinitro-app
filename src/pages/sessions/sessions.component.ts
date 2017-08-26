import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'sessions',
  templateUrl: 'sessions.component.html'
})
export class SessionsComponent {
  constructor(
    public navCtrl: NavController,
    public session: SessionService
  ) { }
}
