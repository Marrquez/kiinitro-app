import { Component } from '@angular/core';

import { AboutComponent } from '../about/about.component';
import { DictionaryComponent } from '../dictionary/dictionary.component';
import { SettingsComponent } from '../settings/settings.component';
import { HomeComponent } from '../home/home.component';
import { SessionComponent } from '../session/session.component';
import { LoginComponent } from '../login/login.component';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'tabs',
  templateUrl: 'tabs.component.html'
})
export class TabsComponent {
  tab1Root = SessionComponent;
  tab2Root = AboutComponent;
  tab3Root = DictionaryComponent;
  tab4Root = LoginComponent;
  tab5Root = SettingsComponent;

  constructor(public user: UserService) { };

  changeImage(){
    let base = './assets/img/kiinitro fitness ';
    let imgNumber = Math.floor((Math.random() * 5) + 1);
    this.user.mainImg = base + imgNumber + '.png';
  };
}
