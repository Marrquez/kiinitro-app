import { Component } from '@angular/core';
import { Platform, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'terms',
  templateUrl: 'terms.component.html'
})
export class TermsComponent {
  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController
  ) { }

  dismiss() {
    this.viewCtrl.dismiss();
  };
}
