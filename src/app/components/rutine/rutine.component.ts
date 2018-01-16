import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController, Nav, Tabs  } from 'ionic-angular';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { ModalController } from 'ionic-angular';

import { SessionService } from '../../services/session.service';
import { UserService } from '../../services/user.service';
import { StretchComponent } from '../stretch/stretch.component';

@Component({
  selector: 'rutine',
  templateUrl: 'rutine.component.html'
})
export class RutineComponent implements OnInit {
  public total = this.session.list.length;
  public lastItem = this.session.list[this.total - 1].id;
  public isFinished = false;
  tab:Tabs;
  constructor(
    public navCtrl: NavController,
    public session: SessionService,
    public user: UserService,
    public toastCtrl: ToastController,
    private ga: GoogleAnalytics,
    public modalCtrl: ModalController,
  ) {
    this.tab = this.navCtrl.parent;
  };

  ngOnInit() {
    this.goNext();
    //this.session.current = this.session.list[this.session.currentIndex];

    this.ga.startTrackerWithId('UA-39578145-1').then(() => {
      console.log('Google analytics is ready now');
      //this.ga.trackView('test');
      this.ga.trackView('rutine');
      // Tracker is ready
      // You can now track pages or set additional information such as AppVersion or UserId
    }).catch(e => console.log('Error starting GoogleAnalytics', e));
  };

  goNext(){
    this.session.currentIndex++;
    if(this.session.data.place === 'Gimnasio'){
      this.session.current = this.session.list[this.session.currentIndex];
      this.session.current.descanso = JSON.parse(this.session.list[this.session.currentIndex].descanso);
      this.session.current.equipamiento = JSON.parse(this.session.list[this.session.currentIndex].equipamiento);
      this.session.current.repeticiones = JSON.parse(this.session.list[this.session.currentIndex].repeticiones);
      this.session.current.series = JSON.parse(this.session.list[this.session.currentIndex].series);
      this.session.current.tips = JSON.parse(this.session.list[this.session.currentIndex].tips);
    }else{
      if(this.session.currentCicle < 3){
        this.session.current = this.session.list[this.session.currentIndex];
        if(this.session.currentIndex === (this.session.list.length - 1)){
          this.session.currentCicle++;
          this.session.currentIndex = -1;
        }
      }
    }
  };

  finish(){
    this.session.currentIndex = -1;
    this.session.currentCicle = 0;
    this.isFinished = true;
    this.sumPoints();
  };

  rate(){
    this.tab.select(1);
  };

  sumPoints(){
    var self = this;
    let currentDate = new Date();
    self.user.internalData.dtEnd = currentDate.toString();
    let points = 0;
    if(this.user.internalData.dtLastSession === '-'){
      points = 100;
    }else{
      //points = this.getDiference() >= 24 ? self.user.internalData.iPoints + 50 : self.user.internalData.iPoints;
      points = self.user.internalData.iPoints + 10;
    }

    if(this.user.internalData.iUserId && this.user.internalData.iUserId != ''){
      self.user.updatePoints(points).then(response => {
        self.user.internalData.dtLastSession = self.user.internalData.dtEnd;
        self.user.internalData.iPoints = points;
      });
    }
  };

  goBack(){
    var self = this;

    self.tab.select(4);
  };

  getDiference() {
    if(this.user.internalData.dtEnd !== '-' && this.user.internalData.dtEnd && this.user.internalData.dtLastSession != '-') {
      let diff = new Date(this.user.internalData.dtEnd).getTime() - new Date(this.user.internalData.dtLastSession).getTime();
      return diff / 1000 / 60 / 60;
    }else{
      return 24;
    }
  };

  getStretching (){
    if(this.session.stretchData.muscles.length === 0){
      let toast = this.toastCtrl.create({
        message: 'Debes seleccionar por lo menos 1 músculo para el estiramiento',
        duration: 3000,
        position: 'top',
        cssClass: 'error-item'
      });
      toast.present();
    }else{
      let modal = this.modalCtrl.create(StretchComponent);
      modal.present();
    }
  }
}
