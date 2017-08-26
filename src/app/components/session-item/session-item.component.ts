import { Component } from '@angular/core';
import { Platform, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'session-item',
  templateUrl: 'session-item.component.html'
})
export class SessionItemComponent {
  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController
  ) { }

  dismiss() {
    this.viewCtrl.dismiss();
  };
}
