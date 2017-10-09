import { Component, OnInit } from '@angular/core';
import { IonicPage, ToastController, Loading, LoadingController, NavController, AlertController, Nav, Tabs } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ValidatorService } from '../../services/validator.service';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { SessionComponent } from '../session/session.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  tab:Tabs;
  public loginForm:FormGroup;
  public loading:Loading;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public auth: AuthService,
    public user: UserService,
    public toastCtrl: ToastController,
    public formBuilder: FormBuilder,
    private ga: GoogleAnalytics
  ) {
    this.tab = this.navCtrl.parent;

    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, ValidatorService.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  };

  ngOnInit() {
    this.ga.startTrackerWithId('UA-39578145-1').then(() => {
      console.log('Google analytics is ready now');
      //this.ga.trackView('test');
      this.ga.trackView('login');
      // Tracker is ready
      // You can now track pages or set additional information such as AppVersion or UserId
    }).catch(e => console.log('Error starting GoogleAnalytics', e));
  };

  logout() {
    this.auth.logoutUser();
    this.user.data = {uid: '', displayName: ''};
    this.user.internalData = {
      iPoints: 0,
      iUserId: '',
      vchUsername: '',
      dtLastSession: '',
      dtBegin: '',
      dtEnd: ''
    };
    this.user.isLogged = false;
  };

  loginUser(): void {
    var self = this;

    if (!self.loginForm.valid){
      console.log(self.loginForm.value);
    } else {
      this.auth.loginUser(self.loginForm.value.email, self.loginForm.value.password).then( authData => {
        self.user.data = authData;
        self.user.isLogged = true;
        self.user.getUserInternalData(authData.uid);
        this.loading.dismiss().then( () => {
          //self.tab.select(0);
        });
      }, error => {
        this.loading.dismiss().then( () => {
          let alert = this.alertCtrl.create({
            message: error.message,
            buttons: [{
              text: "Ok",
              role: 'cancel'
            }]
          });

          alert.present();
        });
      });
      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }

  logByGoogle(){
    var self = this;

    this.auth.logByGoogle();
  };

  logByFacebook(){
    var self = this;

    self.auth.logByFacebook();
  };

  changePoints(){
    var self = this;
    self.user.updatePoints(0).then(response => {
      self.user.internalData.iPoints = 0;
      let toast = this.toastCtrl.create({
        message: '¡Disfruta tu regalo!, ahora tienes 0 puntos. Gracias por usar Kiinitro Fitness.',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  };

  goToSignup(): void { this.navCtrl.push(SignUpComponent); }

  goToResetPassword(): void { this.navCtrl.push(ResetPasswordComponent); }
}
