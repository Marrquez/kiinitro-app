import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, ToastController, Loading, LoadingController, NavController, AlertController, Nav, Tabs } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { ValidatorService } from '../../services/validator.service';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { SessionComponent } from '../session/session.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { ImcInfoComponent } from '../imc-info/imc-info.component';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  @ViewChild('submitSave') submitSave: ElementRef;
  tab:Tabs;
  public loginForm:FormGroup;
  public editForm:FormGroup;
  public loading:Loading;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public auth: AuthService,
    public user: UserService,
    public toastCtrl: ToastController,
    public formBuilder: FormBuilder,
    private ga: GoogleAnalytics,
  ) {
    this.tab = this.navCtrl.parent;

    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, ValidatorService.isValid])],
      password: ['', Validators.compose([Validators.minLength(2), Validators.required])]
    });

    this.editForm = formBuilder.group({
      weight: ['', Validators.compose([Validators.minLength(2), Validators.required])],
      height: ['', Validators.compose([Validators.minLength(2), Validators.required])]
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
      dtEnd: '',
      height: 0,
      weight: 0,
      imc: 0
    };
    this.user.isLogged = false;
  };

  saveUser(){
    this.submitSave.nativeElement.click();
  };

  editUser(): void {
    var self = this;

    if(!self.editForm.valid){
      let toast = this.toastCtrl.create({
        message: 'Todos los campos son obligatorios',
        duration: 3000,
        position: 'top',
        cssClass: 'error-item'
      });
      toast.present();
    }else{
      self.user.internalData.imc = self.user.internalData.weight && self.user.internalData.height ?
        Number((Number(self.user.internalData.weight) / ( (Number(self.user.internalData.height)/100) * (Number(self.user.internalData.height)/100) ) ).toFixed(2)) : 0;
      this.user.updateUserProfile().then(response => {
        let toast = this.toastCtrl.create({
          message: 'Los cambios se han guardado correctamente',
          duration: 3000,
          position: 'top',
          cssClass: 'success-item'
        });
        toast.present();
      });
    }
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

  showImcInfo(){
    if(this.user.internalData.imc > 0){
      this.navCtrl.push(ImcInfoComponent);
    }else{
      let toast = this.toastCtrl.create({
        message: 'Debes especificar tu peso y estatura para obtener más información',
        duration: 3000,
        position: 'top',
        cssClass: 'info-item'
      });
      toast.present();
    }
  };

  goToSignup(): void { this.navCtrl.push(SignUpComponent); }

  goToResetPassword(): void { this.navCtrl.push(ResetPasswordComponent); }
}
