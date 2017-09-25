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
    let points = this.getDiference() >= 24 ? self.user.internalData.iPoints + 100 : self.user.internalData.iPoints;

    self.user.updatePoints(points).then(response => {
      self.user.internalData.iPoints = points;
    });
  };

  goBack(){
    var self = this;

    self.tab.select(3);
  };

  getDiference() {
    if(this.user.internalData.dtLastSession !== '-'){
      let diff = new Date().getTime() - new Date(this.user.internalData.dtLastSession).getTime();
      return diff / 1000 / 60 / 60;
    }else{
      return 24;
    }
  };
}
