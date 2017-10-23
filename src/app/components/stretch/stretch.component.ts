import { Component, OnInit } from '@angular/core';
import { Platform, NavParams, ViewController } from 'ionic-angular';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { UserService } from '../../services/user.service';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'stretch',
  templateUrl: 'stretch.component.html'
})
export class StretchComponent implements OnInit {
  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    private ga: GoogleAnalytics,
    public user: UserService,
    public session: SessionService,
  ) { }

  dismiss() {
    this.viewCtrl.dismiss();
  };

  ngOnInit() {
    this.configureStretchSession();

    this.ga.startTrackerWithId('UA-39578145-1').then(() => {
      console.log('Google analytics is ready now');
      //this.ga.trackView('test');
      this.ga.trackView('stretch');
      // Tracker is ready
      // You can now track pages or set additional information such as AppVersion or UserId
    }).catch(e => console.log('Error starting GoogleAnalytics', e));
  };

  configureStretchSession(){
    this.session.stretchData.stretchSession = [];
    for(var i = 0; i < this.session.stretchData.muscles.length; i++){
      var muscle = this.session.stretchData.muscles[i];
      switch(muscle){
        case 'Pantorrillas':
          this.addStretchMuscle(4, muscle);
          break;

        case 'Pecho':
          this.addStretchMuscle(5, muscle);
          break;

        case 'Abdomen':
        case 'Trapecio':
          this.addStretchMuscle(6, muscle);
          break;

        case 'Biceps':
        case 'Espalda':
        case 'Hombros':
        case 'Muslos':
        case 'Triceps':
          this.addStretchMuscle(8, muscle);
          break;
      }
    }
  };

  addStretchMuscle(total: number, muscle: string){
    var arr = [];

    while(arr.length < 3){
      var randomnumber = Math.floor((Math.random() * total) + 1);
      if(arr.indexOf(randomnumber) > -1) continue;
      arr[arr.length] = randomnumber;
    }

    for(var j = 0; j < arr.length; j++){
      this.session.stretchData.stretchSession.push(muscle + " " + arr[j] + ".png");
    }
  };
}
