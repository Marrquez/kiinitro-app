import { Component } from '@angular/core';

import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';
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
  tab3Root = ContactComponent;
  tab4Root = LoginComponent;

  constructor(public user: UserService) { };

  changeImage(){
    let base = './assets/img/kiinitro fitness ';
    let imgNumber = Math.floor((Math.random() * 4) + 1);
    this.user.mainImg = base + imgNumber + '.png';
  };
}
