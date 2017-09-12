import { Component } from '@angular/core';

import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';
import { HomeComponent } from '../home/home.component';
import { SessionComponent } from '../session/session.component';

@Component({
  selector: 'tabs',
  templateUrl: 'tabs.component.html'
})
export class TabsComponent {
  tab1Root = HomeComponent;
  tab2Root = AboutComponent;
  tab3Root = ContactComponent;
  tab4Root = SessionComponent;

  constructor() { }
}
