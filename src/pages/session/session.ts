import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SessionService } from '../../services/session.service';

@Component({
  selector: 'page-session',
  templateUrl: 'session.html'
})
export class SessionPage {
  constructor(
    public navCtrl: NavController,
    public session: SessionService
  ) { }
}
