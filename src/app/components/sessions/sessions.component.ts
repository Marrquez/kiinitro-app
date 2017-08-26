import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';

import { SessionItemComponent } from '../session-item/session-item.component';

@Component({
  selector: 'sessions',
  templateUrl: 'sessions.component.html'
})
export class SessionsComponent {
  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController
  ) { }

  presentModal() {
    let modal = this.modalCtrl.create(SessionItemComponent);
    modal.present();
  }
}
