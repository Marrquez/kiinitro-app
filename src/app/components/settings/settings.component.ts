import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { TranslateService } from '../localization/translate.service';

@Component({
  selector: 'settings',
  templateUrl: 'settings.component.html'
})
export class SettingsComponent implements OnInit {
  constructor(private ga: GoogleAnalytics, private _translate: TranslateService) { };

  ngOnInit() {
    this.ga.startTrackerWithId('UA-39578145-1').then(() => {
      console.log('Google analytics is ready now');
      this.ga.trackView('settings');
      // Tracker is ready
      // You can now track pages or set additional information such as AppVersion or UserId
    }).catch(e => console.log('Error starting GoogleAnalytics', e));
  };

  setLang(key: string){
    this._translate.selectLang(key);
  };
}
