import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import { SessionService } from '../../services/session.service';
import { SessionsComponent } from '../sessions/sessions.component';

@Component({
  selector: 'session',
  templateUrl: 'session.component.html'
})
export class SessionComponent {
  constructor(
    public navCtrl: NavController,
    public session: SessionService,
    public toastCtrl: ToastController
  ) { }

  goToSession() {
    if(!this.session.data.gender || !this.session.data.time || !this.session.data.target || !this.session.data.place){
      let toast = this.toastCtrl.create({
        message: 'Todas las opciones deben estar seleccionadas',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }else {
      this.navCtrl.push(SessionsComponent);
    }
  };
}
