import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';

/**
 * Components
 * */
import { AboutComponent } from '../pages/about/about.component';
import { ContactComponent } from '../pages/contact/contact.component';
import { HomeComponent } from '../pages/home/home.component';
import { TabsComponent } from '../pages/tabs/tabs.component';
import { SessionComponent } from '../pages/session/session.component';
import { SessionsComponent } from '../pages/sessions/sessions.component';

/**
 * Services
 * */
import { SessionService } from '../services/session.service';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    AboutComponent,
    ContactComponent,
    HomeComponent,
    TabsComponent,
    SessionComponent,
    SessionsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutComponent,
    ContactComponent,
    HomeComponent,
    TabsComponent,
    SessionComponent,
    SessionsComponent,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SessionService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
