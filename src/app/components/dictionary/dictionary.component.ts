import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'dictionary',
  templateUrl: 'dictionary.component.html'
})
export class DictionaryComponent implements OnInit {
  constructor(private ga: GoogleAnalytics, public session: SessionService,) { };

  ngOnInit() {
    this.ga.startTrackerWithId('UA-39578145-1').then(() => {
      console.log('Google analytics is ready now');
      this.ga.trackView('dictionary');
      // Tracker is ready
      // You can now track pages or set additional information such as AppVersion or UserId
    }).catch(e => console.log('Error starting GoogleAnalytics', e));
  };
}
