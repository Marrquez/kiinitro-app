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
    if(!this.session.data.gender || !this.session.data.time || !this.session.data.target || !this.session.data.place || this.session.data.muscles.length === 0){
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
      if(!this.existTrapecio()){
        this.session.muscles.push({ name: 'Trapecio', id: 7 });
      }
    }else {
      this.removeTrapecio();
    }

    this.session.dataItems.muscles = this.session.muscles;
  }

  removeTrapecio(){
    this.session.muscles = this.session.muscles.filter(function(muscle){
      return muscle.name !== 'Trapecio';
    });
  }

  existTrapecio(){
    var resp = false;
    for(var i = 0; i < this.session.muscles.length; i++){
      let muscle = this.session.muscles[i];
      if(muscle.name === 'Trapecio'){
        resp = true;
      }
    }
    return resp;
  }

  showTerms(){
    let modal = this.modalCtrl.create(TermsComponent);
    modal.present();
  };
}
