import { Component, OnInit } from '@angular/core';
import { Platform, NavParams, ViewController } from 'ionic-angular';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'imc-info',
  templateUrl: 'imc-info.component.html'
})
export class ImcInfoComponent implements OnInit {
  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    private ga: GoogleAnalytics,
    public user: UserService,
  ) { }

  dismiss() {
    this.viewCtrl.dismiss();
  };

  ngOnInit() {
    this.ga.startTrackerWithId('UA-39578145-1').then(() => {
      console.log('Google analytics is ready now');
      //this.ga.trackView('test');
      this.ga.trackView('imc');
      // Tracker is ready
      // You can now track pages or set additional information such as AppVersion or UserId
    }).catch(e => console.log('Error starting GoogleAnalytics', e));
  };
}
