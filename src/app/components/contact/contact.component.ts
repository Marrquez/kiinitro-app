import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

@Component({
  selector: 'contact',
  templateUrl: 'contact.component.html'
})
export class ContactComponent {
  constructor(public navCtrl: NavController, private ga: GoogleAnalytics) { }

  ngOnInit(){
    this.ga.startTrackerWithId('UA-39578145-1').then(() => {
      console.log('Google analytics is ready now');
      //this.ga.trackView('test');
      this.ga.trackView('contact');
      // Tracker is ready
      // You can now track pages or set additional information such as AppVersion or UserId
    }).catch(e => console.log('Error starting GoogleAnalytics', e));
  };
}
