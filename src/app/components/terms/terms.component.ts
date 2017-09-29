import { Component } from '@angular/core';
import { Platform, NavParams, ViewController } from 'ionic-angular';

import { GoogleAnalytics } from '@ionic-native/google-analytics';
@Component({
  selector: 'terms',
  templateUrl: 'terms.component.html'
})
export class TermsComponent {
  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    private ga: GoogleAnalytics
  ) { }

  ngOnInit(){
    this.ga.startTrackerWithId('UA-39578145-1').then(() => {
      console.log('Google analytics is ready now');
      //this.ga.trackView('test');
      this.ga.trackView('terms');
      // Tracker is ready
      // You can now track pages or set additional information such as AppVersion or UserId
    }).catch(e => console.log('Error starting GoogleAnalytics', e));
  };

  dismiss() {
    this.viewCtrl.dismiss();
  };
}
