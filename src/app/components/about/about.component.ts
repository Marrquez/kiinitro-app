import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

import { TeamComponent } from '../team/team.component';
import { ServicesComponent } from '../services/services.component';
import { BenefitsComponent } from '../benefits/benefits.component';
import { ExtrasComponent } from '../extras/extras.component';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'about',
  templateUrl: 'about.component.html'
})
export class AboutComponent implements OnInit {
  constructor(
    public navCtrl: NavController,
    public user: UserService,
    public modalCtrl: ModalController,
    private ga: GoogleAnalytics
    ) { };

  ngOnInit() {
    this.ga.startTrackerWithId('UA-39578145-1').then(() => {
      console.log('Google analytics is ready now');
      this.ga.trackView('about');
      // Tracker is ready
      // You can now track pages or set additional information such as AppVersion or UserId
    }).catch(e => console.log('Error starting GoogleAnalytics', e));
  };

  showTeam(){
    let modal = this.modalCtrl.create(TeamComponent);
    modal.present();
  };

  showServices(){
    let modal = this.modalCtrl.create(ServicesComponent);
    modal.present();
  };

  showBenefits(){
    let modal = this.modalCtrl.create(BenefitsComponent);
    modal.present();
  };

  showExtras(){
    let modal = this.modalCtrl.create(ExtrasComponent);
    modal.present();
  };
}
