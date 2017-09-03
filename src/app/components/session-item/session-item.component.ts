import { Component } from '@angular/core';
import { Platform, NavParams, ViewController } from 'ionic-angular';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'session-item',
  templateUrl: 'session-item.component.html'
})
export class SessionItemComponent {
  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public session: SessionService,
  ) { }

  dismiss() {
    this.viewCtrl.dismiss();
  };
}
