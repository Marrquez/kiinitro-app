import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { SessionService } from '../../services/session.service';
import { CatalogItemComponent } from '../catalog-item/catalog-item.component';
import { NavController, ActionSheetController } from 'ionic-angular';

@Component({
  selector: 'dictionary',
  templateUrl: 'dictionary.component.html'
})
export class DictionaryComponent implements OnInit {
  public items = [];
  constructor(public actionSheetCtrl: ActionSheetController, private ga: GoogleAnalytics, public session: SessionService,public navCtrl: NavController) { };

  ngOnInit() {
    this.ga.startTrackerWithId('UA-39578145-1').then(() => {
      console.log('Google analytics is ready now');
      this.ga.trackView('dictionary');
      // Tracker is ready
      // You can now track pages or set additional information such as AppVersion or UserId
    }).catch(e => console.log('Error starting GoogleAnalytics', e));

    this.items = this.session.dictionary;
  };

  showCatalogItem(catalogItem: any){
    this.session.catalogItem = catalogItem;
    this.navCtrl.push(CatalogItemComponent);
  };

  updateCurrentData(){
    this.applyFilter('All');
  };

  applyFilter(selected: string){
    var self = this;
    self.session.filterCriteria = selected;

    if(this.session.filterCriteria === 'All'){
      this.items = this.session.dictionary;
    }else{
      this.items = this.session.dictionary.filter(function(ele){
        return ele.type.toLowerCase().indexOf(self.session.filterCriteria.toLowerCase()) > -1;
      });
    }
  };

  presentActionSheet() {
    var self = this;
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Filtrar por músculo',
      cssClass: 'custom-actionsheet',
      buttons: [
        {
          text: 'All',
          handler: () => {
            self.applyFilter('All');
          }
        },
        {
          text: 'Abdomen',
          handler: () => {
            self.applyFilter('Abdomen');
          }
        },
        {
          text: 'Bíceps',
          handler: () => {
            self.applyFilter('Bíceps');
          }
        },
        {
          text: 'Cuerpo completo',
          handler: () => {
            self.applyFilter('Cuerpo completo');
          }
        },
        {
          text: 'Espalda',
          handler: () => {
            self.applyFilter('Espalda');
          }
        },
        {
          text: 'Hombros',
          handler: () => {
            self.applyFilter('Hombros');
          }
        },
        {
          text: 'Muslos',
          handler: () => {
            self.applyFilter('Muslos');
          }
        },
        {
          text: 'Pantorrillas',
          handler: () => {
            self.applyFilter('Pantorrillas');
          }
        },
        {
          text: 'Pecho',
          handler: () => {
            self.applyFilter('Pecho');
          }
        },
        {
          text: 'Trapecio',
          handler: () => {
            self.applyFilter('Trapecio');
          }
        },
        {
          text: 'Tren superior',
          handler: () => {
            self.applyFilter('Tren superior');
          }
        },
        {
          text: 'Tren inferior',
          handler: () => {
            self.applyFilter('Tren inferior');
          }
        },
        {
          text: 'Tríceps',
          handler: () => {
            self.applyFilter('Tríceps');
          }
        },
      ]
    });

    actionSheet.present();
  }
}
