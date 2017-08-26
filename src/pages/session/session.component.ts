import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SessionService } from '../../services/session.service';
import { SessionsComponent } from '../sessions/sessions.component';

@Component({
  selector: 'session',
  templateUrl: 'session.component.html'
})
export class SessionComponent {
  constructor(
    public navCtrl: NavController,
    public session: SessionService
  ) { }

  goToSession() {
    this.navCtrl.push(SessionsComponent);
  };
}
