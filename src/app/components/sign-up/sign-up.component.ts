import { Component } from '@angular/core';
import { IonicPage,
  NavController,
  Loading,
  LoadingController,
  AlertController, Nav, Tabs } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from '../../services/validator.service';
import { AuthService } from '../../services/auth.service';
import { SessionComponent } from '../session/session.component';

@Component({
  selector: 'sign-up',
  templateUrl: 'sign-up.component.html',
})
export class SignUpComponent {
  tab:Tabs;
  public signupForm: FormGroup;
  loading: Loading;
  constructor(public navCtrl: NavController, public auth: AuthService,
              public formBuilder: FormBuilder, public loadingCtrl: LoadingController,
              public alertCtrl: AlertController) {
    this.tab = this.navCtrl.parent;
    this.signupForm = formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      email: ['', Validators.compose([Validators.required, ValidatorService.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  };

  signupUser(){
    var self = this;
    if (!this.signupForm.valid){
      console.log(this.signupForm.value);
    } else {
      this.auth.signupUser(this.signupForm.value.email, this.signupForm.value.password, this.signupForm.value.username).then(() => {
        this.loading.dismiss().then(() => {
          this.navCtrl.setRoot(SessionComponent);
          self.tab.select(0);
        });
      }, (error) => {
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
}
