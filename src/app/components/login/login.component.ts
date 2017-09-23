import { Component, OnInit } from '@angular/core';
import { IonicPage, Loading, LoadingController, NavController, AlertController, Nav, Tabs } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ValidatorService } from '../../services/validator.service';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { SessionComponent } from '../session/session.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import firebase from 'firebase';

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
    public formBuilder: FormBuilder
  ) {
    this.tab = this.navCtrl.parent;
    firebase.initializeApp({
      apiKey: "AIzaSyCQLJM4RBmvPWaghoKjkTjUI60HKdx3KtA",
      authDomain: "kiinitro-5eb0b.firebaseapp.com",
      databaseURL: "https://kiinitro-5eb0b.firebaseio.com",
      projectId: "kiinitro-5eb0b",
      storageBucket: "kiinitro-5eb0b.appspot.com",
      messagingSenderId: "871776241739"
    });

    this.auth.isAuth();

    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, ValidatorService.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  };

  ngOnInit() {
    var a = 1;
  };

  logout() {
    this.auth.logoutUser();
    this.user.data = {};
    this.user.isLogged = false;
  };

  loginUser(): void {
    var self = this;
    if (!this.loginForm.valid){
      console.log(this.loginForm.value);
    } else {
      this.auth.loginUser(this.loginForm.value.email, this.loginForm.value.password).then( authData => {
        self.user.data = authData;
        self.user.isLogged = true;
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
    this.auth.logByGoogle();
  };

  goToSignup(): void { this.navCtrl.push(SignUpComponent); }

  goToResetPassword(): void { this.navCtrl.push(ResetPasswordComponent); }
}
