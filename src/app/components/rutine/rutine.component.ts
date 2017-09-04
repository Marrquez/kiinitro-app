import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import { SessionService } from '../../services/session.service';

@Component({
  selector: 'rutine',
  templateUrl: 'rutine.component.html'
})
export class RutineComponent implements OnInit {
  public total = this.session.list.length;
  public lastItem = this.session.list[this.total - 1].id;
  public isFinished = false;
  constructor(
    public navCtrl: NavController,
    public session: SessionService,
    public toastCtrl: ToastController
  ) { };

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
  };

  rate(){
    console.log('i like it!');
    this.navCtrl.pop();
    this.navCtrl.pop();
  };

  goBack(){
    this.navCtrl.pop();
  };
}
