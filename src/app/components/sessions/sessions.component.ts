import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';

import { SessionItemComponent } from '../session-item/session-item.component';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'sessions',
  templateUrl: 'sessions.component.html'
})
export class SessionsComponent implements OnInit {
  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public session: SessionService,
    private splash: SplashScreen
  ) { };

  ngOnInit() {
    //this.splash.show();
    this.getTasks();
  };

  getTasks(){
    let muscles = JSON.stringify(this.session.data.muscle.split('-'));
    this.session.getEjercicesByMuscle(muscles).then(response => {
      console.log(response);
    });
  };

  presentModal() {
    let modal = this.modalCtrl.create(SessionItemComponent);
    modal.present();
  };
}
