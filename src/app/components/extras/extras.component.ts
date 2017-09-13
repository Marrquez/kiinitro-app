import { Component } from '@angular/core';
import { Platform, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'extras',
  templateUrl: 'extras.component.html'
})
export class ExtrasComponent {
  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController
  ) { }

  dismiss() {
    this.viewCtrl.dismiss();
  };
}
