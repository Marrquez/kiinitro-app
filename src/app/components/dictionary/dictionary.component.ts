import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { SessionService } from '../../services/session.service';
import { CatalogItemComponent } from '../catalog-item/catalog-item.component';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'dictionary',
  templateUrl: 'dictionary.component.html'
})
export class DictionaryComponent implements OnInit {
  constructor(private ga: GoogleAnalytics, public session: SessionService,public navCtrl: NavController) { };

  ngOnInit() {
    this.ga.startTrackerWithId('UA-39578145-1').then(() => {
      console.log('Google analytics is ready now');
      this.ga.trackView('dictionary');
      // Tracker is ready
      // You can now track pages or set additional information such as AppVersion or UserId
    }).catch(e => console.log('Error starting GoogleAnalytics', e));
  };

  showCatalogItem(catalogItem: any){
    this.session.catalogItem = catalogItem;
    this.navCtrl.push(CatalogItemComponent);
  };

  updateCurrentData(){
    console.log("update current data");
  };
}
