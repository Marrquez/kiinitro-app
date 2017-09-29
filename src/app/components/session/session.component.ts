import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

import { SessionService } from '../../services/session.service';
import { SessionsComponent } from '../sessions/sessions.component';
import { TermsComponent } from '../terms/terms.component';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'session',
  templateUrl: 'session.component.html'
})
export class SessionComponent implements OnInit {
  constructor(
    public navCtrl: NavController,
    public session: SessionService,
    public auth: AuthService,
    public toastCtrl: ToastController,
    public user: UserService,
    public modalCtrl: ModalController,
    private ga: GoogleAnalytics
  ) {
    this.auth.initFirebase();
  };

  ngOnInit() {
    this.auth.isAuth();
    this.auth.getGoogleUser();
    this.auth.getFacebookUser();

    this.ga.startTrackerWithId('UA-39578145-1').then(() => {
      console.log('Google analytics is ready now');
      //this.ga.trackView('test');
      this.ga.trackView('session');
      // Tracker is ready
      // You can now track pages or set additional information such as AppVersion or UserId
    }).catch(e => console.log('Error starting GoogleAnalytics', e));
  };

  goToSession() {
    if(!this.session.data.gender || !this.session.data.time || !this.session.data.target || !this.session.data.place || !this.session.data.muscle){
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

  showTerms(){
    let modal = this.modalCtrl.create(TermsComponent);
    modal.present();
  };
}
