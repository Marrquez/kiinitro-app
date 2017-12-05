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
    if(!this.session.data.gender){
      this.notifyError();
    } else if(this.session.data.place === ''){
      this.notifyError();
    } else if((this.session.data.place === 'Gimnasio' && (!this.session.data.time || !this.session.data.target || !this.session.data.place || this.session.data.muscles.length === 0)) || (this.session.data.place === 'Casa' && this.session.data.bodyPart === '')) {
      this.notifyError();
    }else {
      this.navCtrl.push(SessionsComponent);
    }
  };

  notifyError(){
    let toast = this.toastCtrl.create({
      message: 'Todas las opciones deben estar seleccionadas',
      duration: 3000,
      position: 'top',
      cssClass: 'error-item'
    });
    toast.present();
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

  showSuggestions(muscle: string) {
    let msg = 'Puedes combinar ';
    if(muscle === ''){
      let toast = this.toastCtrl.create({
        message: 'Terecomendamos seleccionar entre 3 y 4 músculos.',
        duration: 5000,
        position: 'top',
        cssClass: 'suggestion-item-muscle'
      });
      toast.present();
    }else{
      msg += muscle;
      switch(muscle){
        case 'Abdomen':
          msg += ' con cualquier músculo';
          break;

        case 'Pantorrillas':
          msg += ' con: Muslos y/o Abdomen';
          break;

        case 'Pecho':
          msg += ' con: Bíceps, Tríceps y/o Abdomen';
          break;

        case 'Espalda':
        case 'Hombros':
          msg += ' con: Bíceps, Tríceps, Trapecio y/o Abdomen';
          break;

        case 'Muslos':
          msg += ' con: Pantorrillas y/o Abdomen';
          break;

        case 'Trapecio':
          msg += ' con: Espalda, Hombros y/o Abdomen';
          break;

        case 'Bíceps':
        case 'Tríceps':
          msg += ' con: Espalda, Hombros, Pecho y/o Abdomen';
          break;
      }

      let toast = this.toastCtrl.create({
        message: msg,
        duration: 5000,
        position: 'top',
        cssClass: 'suggestion-item-muscle'
      });
      toast.present();
    }
  }

  validateMuscle(muscle: string){
    return this.session.data.muscles.filter(function(element){return element === muscle}).length > 0;
  };
}
