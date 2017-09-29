import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController, Nav, Tabs  } from 'ionic-angular';

import { SessionService } from '../../services/session.service';
import { UserService } from '../../services/user.service';

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
    public toastCtrl: ToastController
  ) {
    this.tab = this.navCtrl.parent;
  };

  ngOnInit() {
    this.session.current = this.session.list[this.session.currentIndex];
  };

  goNext(){
    this.session.currentIndex++;
    this.session.current = this.session.list[this.session.currentIndex];
  };

  finish(){
    this.session.currentIndex = 0;
    this.isFinished = true;
    this.sumPoints();
  };

  rate(){
    this.tab.select(0);
  };

  sumPoints(){
    var self = this;
    let currentDate = new Date();
    self.user.internalData.dtEnd = currentDate.toString();
    let points = 0;
    if(this.user.internalData.dtLastSession === '-'){
      points = 100;
    }else{
      points = this.getDiference() >= 24 ? self.user.internalData.iPoints + 10 : self.user.internalData.iPoints;
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

    self.tab.select(3);
  };

  getDiference() {
    if(this.user.internalData.dtEnd !== '-' && this.user.internalData.dtEnd && this.user.internalData.dtLastSession != '-') {
      let diff = new Date(this.user.internalData.dtEnd).getTime() - new Date(this.user.internalData.dtLastSession).getTime();
      return diff / 1000 / 60 / 60;
    }else{
      return 24;
    }
  };
}
