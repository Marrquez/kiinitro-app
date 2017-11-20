import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Kiinitro } from './kiinitro.component';
import { HttpModule } from '@angular/http';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { AppRate } from '@ionic-native/app-rate';
import { TRANSLATION_PROVIDERS, TranslatePipe, TranslateService }   from './components/localization/imports';

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
import { CatalogItemComponent } from './components/catalog-item/catalog-item.component';
import { TeamComponent } from './components/team/team.component';
import { ServicesComponent } from './components/services/services.component';
import { BenefitsComponent } from './components/benefits/benefits.component';
import { ExtrasComponent } from './components/extras/extras.component';
import { RutineComponent } from './components/rutine/rutine.component';
import { LoginComponent } from './components/login/login.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { TermsComponent } from './components/terms/terms.component';
import { ImcInfoComponent } from './components/imc-info/imc-info.component';
import { StretchComponent } from './components/stretch/stretch.component';
import { DictionaryComponent } from './components/dictionary/dictionary.component';
import { SettingsComponent } from './components/settings/settings.component';
import { WarmComponent } from './components/warm/warm.component';

/**
 * Services
 * */
import { SessionService } from './services/session.service';
import { AuthService } from './services/auth.service';
import { ValidatorService } from './services/validator.service';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UserService } from './services/user.service';

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
    CatalogItemComponent,
    RutineComponent,
    TeamComponent,
    ServicesComponent,
    BenefitsComponent,
    ExtrasComponent,
    LoginComponent,
    SignUpComponent,
    ResetPasswordComponent,
    TermsComponent,
    ImcInfoComponent,
    StretchComponent,
    DictionaryComponent,
    SettingsComponent,
    TranslatePipe,
    WarmComponent
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
    CatalogItemComponent,
    RutineComponent,
    TeamComponent,
    ServicesComponent,
    BenefitsComponent,
    ExtrasComponent,
    LoginComponent,
    SignUpComponent,
    ResetPasswordComponent,
    TermsComponent,
    ImcInfoComponent,
    StretchComponent,
    DictionaryComponent,
    SettingsComponent,
    WarmComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SessionService,
    AuthService,
    ValidatorService,
    UserService,
    GoogleAnalytics,
    AppRate,
    TRANSLATION_PROVIDERS,
    TranslateService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
