import { Component } from '@angular/core';
import { Platform, NavParams, ViewController } from 'ionic-angular';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

import { SessionService } from '../../services/session.service';

@Component({
  selector: 'catalog-item',
  templateUrl: 'catalog-item.component.html'
})
export class CatalogItemComponent {
  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public session: SessionService,
    private ga: GoogleAnalytics
  ) { }

  ngOnInit(){
    this.ga.startTrackerWithId('UA-39578145-1').then(() => {
      console.log('Google analytics is ready now');
      //this.ga.trackView('test');
      this.ga.trackView('catalog-item');
      // Tracker is ready
      // You can now track pages or set additional information such as AppVersion or UserId
    }).catch(e => console.log('Error starting GoogleAnalytics', e));

    this.getCatalogItem();
  };

  getCatalogItem(){
    var self = this;
    let place:string = self.session.catalogItem.place === 'Gym' ? '1' : '0';

    this.session.getEjercicio(self.session.catalogItem.id, place).then(response => {
      if(self.session.catalogItem.place === 'Gym'){
        self.session.catalogItem.nombre = response.nombre;
        self.session.catalogItem.desc = response.descripcion;
        self.session.catalogItem.img = response.gif;
        self.session.catalogItem.pasos = JSON.parse(response.pasos);
      }else{
        self.session.catalogItem.nombre = response.vchName;
        self.session.catalogItem.desc = response.vchDescription;
        self.session.catalogItem.img = response.imgGif;
        self.session.catalogItem.int = response.vchIntensity;
        self.session.catalogItem.pasos = [];
      }
    });
  };

  dismiss() {
    this.viewCtrl.dismiss();
  };
}
