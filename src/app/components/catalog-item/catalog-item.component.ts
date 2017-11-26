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
        self.session.catalogItem.nombre = response.data.nombre;
        self.session.catalogItem.desc = response.data.descripcion;
        self.session.catalogItem.img = response.data.gif;
        self.session.catalogItem.pasos = response.data.pasos;
      }else{
        self.session.catalogItem.nombre = response.data.vchName;
        self.session.catalogItem.desc = response.data.vchDescription;
        self.session.catalogItem.img = response.data.imgGif;
        self.session.catalogItem.int = response.data.vchIntensity;
        self.session.catalogItem.pasos = [];
      }
    });
  };

  dismiss() {
    this.viewCtrl.dismiss();
  };
}
