import { Component } from '@angular/core';
import { Platform, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'team',
  templateUrl: 'team.component.html'
})
export class TeamComponent {
  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController
  ) { }

  dismiss() {
    this.viewCtrl.dismiss();
  };
}
