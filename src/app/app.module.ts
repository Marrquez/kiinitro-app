import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Kiinitro } from './kiinitro.component';
import { HttpModule } from '@angular/http';

/**
 * Components
 * */
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { SessionComponent } from './components/session/session.component';
import { SessionsComponent } from './components/sessions/sessions.component';
import { SessionItemComponent } from './components/session-item/session-item.component';
import { TeamComponent } from './components/team/team.component';
import { ServicesComponent } from './components/services/services.component';
import { BenefitsComponent } from './components/benefits/benefits.component';
import { ExtrasComponent } from './components/extras/extras.component';
import { RutineComponent } from './components/rutine/rutine.component';

/**
 * Services
 * */
import { SessionService } from './services/session.service';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    Kiinitro,
    AboutComponent,
    ContactComponent,
    HomeComponent,
    TabsComponent,
    SessionComponent,
    SessionsComponent,
    SessionItemComponent,
    RutineComponent,
    TeamComponent,
    ServicesComponent,
    BenefitsComponent,
    ExtrasComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(Kiinitro)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    Kiinitro,
    AboutComponent,
    ContactComponent,
    HomeComponent,
    TabsComponent,
    SessionComponent,
    SessionsComponent,
    SessionItemComponent,
    RutineComponent,
    TeamComponent,
    ServicesComponent,
    BenefitsComponent,
    ExtrasComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SessionService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
