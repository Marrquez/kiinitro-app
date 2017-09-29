import { Component } from '@angular/core';
import { Platform, NavParams, ViewController } from 'ionic-angular';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

@Component({
  selector: 'benefits',
  templateUrl: 'benefits.component.html'
})
export class BenefitsComponent {
  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    private ga: GoogleAnalytics
  ) { }

  ngOnInit(){
    this.ga.startTrackerWithId('UA-39578145-1').then(() => {
      console.log('Google analytics is ready now');
      //this.ga.trackView('');
      this.ga.trackView('benefits');
      // Tracker is ready
      // You can now track pages or set additional information such as AppVersion or UserId
    }).catch(e => console.log('Error starting GoogleAnalytics', e));
  }

  dismiss() {
    this.viewCtrl.dismiss();
  };
}
