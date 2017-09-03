import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
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
import { RutineComponent } from './components/rutine/rutine.component';

/**
 * Services
 * */
import { SessionService } from './services/session.service';
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
    SessionsComponent,
    SessionItemComponent,
    RutineComponent
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
    SessionItemComponent,
    RutineComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SessionService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
