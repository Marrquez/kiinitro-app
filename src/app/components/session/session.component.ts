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

  updateMuscles(){
    if(this.session.data.gender === 'Hombre'){
      if(this.session.data.time === '12 o más'){
        this.session.dataItems.muscles = JSON.parse(JSON.stringify(this.session.muscles[1]));
      }else if(this.session.data.time === "0 - 5 meses" || this.session.data.time == '6 - 11 meses') {
        this.session.dataItems.muscles = JSON.parse(JSON.stringify(this.session.muscles[0]));
      }else {
        this.session.dataItems.muscles = [];
      }
    }else {
      this.session.dataItems.muscles = JSON.parse(JSON.stringify(this.session.muscles[2]));
    }
  }
}
