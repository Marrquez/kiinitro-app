import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

import { SessionItemComponent } from '../session-item/session-item.component';
import { RutineComponent } from '../rutine/rutine.component';
import { SessionService } from '../../services/session.service';
import { UserService } from '../../services/user.service';
import { WarmComponent } from '../warm/warm.component';

@Component({
  selector: 'sessions',
  templateUrl: 'sessions.component.html'
})
export class SessionsComponent implements OnInit {
  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public session: SessionService,
    public user: UserService,
    private splash: SplashScreen,
    private ga: GoogleAnalytics,
  ) { };

  ngOnInit() {
    this.splash.show();
    this.getTasks();

    this.ga.startTrackerWithId('UA-39578145-1').then(() => {
      console.log('Google analytics is ready now');
      //this.ga.trackView('test');
      this.ga.trackView('sessions');
      // Tracker is ready
      // You can now track pages or set additional information such as AppVersion or UserId
    }).catch(e => console.log('Error starting GoogleAnalytics', e));
  };

  getTasks(){
    var self = this;
    this.session.list = [];

    if(this.session.data.warm){
      this.session.getWarmByPlace(this.session.data.place, 'Cardiovascular').then(response => {
        self.session.warmExercises = response;
        this.getExcersices();
      });
    }else{
      this.getExcersices();
    }
  };

  getExcersices(){
    var self = this;
    if(this.session.data.place === 'Gimnasio') {
      this.setGroup();
      let muscles = JSON.stringify(this.session.data.muscles).slice(1, -1).replace(/"/g, '');

      this.session.getEjercicesByMuscle(muscles).then(response => {
        self.session.fullData = response;
        self.updateArrays();
        self.selectExercises();
        self.addRest();
        self.splash.hide();
      });
    } else if(this.session.data.place === 'Casa') {
      var trainingType = 'musculacion';
      var trainingZone = this.session.data.bodyPart;

      this.session.getHomeEjercices(this.session.data.place, trainingType, trainingZone).then(response => {
        self.session.list = [];
        self.session.homeExc = response;
        self.addElements(-1, self.session.homeExc);
      });
    } else {

    }
  };

  addRest(){
    let reps = 0;

    for(var i = 0; i < this.session.list.length; i++){
      if(this.session.data.time === '0 - 5 meses'){
        reps = this.session.list[i].repeticiones[5].N;
      }

      if(this.session.data.time === '6 - 11 meses'){
        reps = this.session.list[i].repeticiones[11].N;
      }

      if(this.session.data.time === '12 o más'){
        reps = 12;
      }

      this.session.list[i].rest = this.session.list[i].descanso[reps].N;
    }
  };

  addElements(indice: number, list: any){
    var cantidad: number = indice === -1 ? 4 : this.session.group[indice];
    var total = list.length;
    var arr = [];

    if(cantidad <= list.length){
      while(arr.length < cantidad){
        var randomnumber = Math.floor((Math.random() * total) + 1) - 1;
        if(arr.indexOf(randomnumber) > -1) continue;
        arr[arr.length] = randomnumber;
      }

      for(var j = 0; j < arr.length; j++){
        var ele = list[arr[j]];

        if(this.session.data.place === 'Gimnasio') {
          ele.equipamiento = JSON.parse(list[arr[j]].equipamiento);
          ele.descanso = JSON.parse(list[arr[j]].descanso);
          ele.repeticiones = JSON.parse(list[arr[j]].repeticiones);
          ele.series = JSON.parse(list[arr[j]].series);
          ele.tips = JSON.parse(list[arr[j]].tips);
        }

        this.session.list.push(ele);
      }
    }else {
      console.log("Hay un error");
    }
  };

  selectExercises(){
    let muscles = this.session.data.muscles;

    for(let i = 0; i < muscles.length; i++) {
      let exercise =  muscles[i];

      switch(exercise) {
        case 'Pecho':
          var quantity = this.session.index.indexOf('Pecho');
          this.addElements(quantity, this.session.pecho);

          break;

        case 'Espalda':
          var quantity = this.session.index.indexOf('Espalda');
          this.addElements(quantity, this.session.espalda);
          break;

        case 'Muslos':
          var quantity = this.session.index.indexOf('Muslos');
          this.addElements(quantity, this.session.muslo);
          break;

        case 'Pantorrillas':
          var quantity = this.session.index.indexOf('Pantorrillas');
          this.addElements(quantity, this.session.pantorrilla);
          break;

        case 'Bíceps':
          var quantity = this.session.index.indexOf('Bíceps');
          this.addElements(quantity, this.session.biceps);
          break;

        case 'Tríceps':
          var quantity = this.session.index.indexOf('Tríceps');
          this.addElements(quantity, this.session.triceps);
          break;

        case 'Hombros':
          var quantity = this.session.index.indexOf('Hombros');
          this.addElements(quantity, this.session.hombro);
          break;

        case 'Trapecio':
          var quantity = this.session.index.indexOf('Trapecio');
          this.addElements(quantity, this.session.trapecio);
          break;

        case 'Abdomen':
          var quantity = this.session.index.indexOf('Abdomen');
          quantity = this.session.data.gender === 'Mujer' ? quantity-1 : quantity;
          this.addElements(quantity, this.session.abdomen);
          break;
      }
    }
  };

  clearArrays(){
    this.session.pecho = [];
    this.session.espalda = [];
    this.session.muslo = [];
    this.session.pantorrilla = [];
    this.session.biceps = [];
    this.session.triceps = [];
    this.session.hombro = [];
    this.session.trapecio = [];
    this.session.abdomen = [];
  };

  updateArrays(){
    this.clearArrays();

    for(let i = 0; i < this.session.fullData.length; i++) {
      let exercise =  JSON.parse(JSON.stringify(this.session.fullData[i]));

      switch(exercise.musculo) {
        case 'Pecho':
          this.session.pecho.push(exercise);
          break;

        case 'Espalda':
          this.session.espalda.push(exercise);
          break;

        case 'Muslos':
          this.session.muslo.push(exercise);
          break;

        case 'Pantorrillas':
          this.session.pantorrilla.push(exercise);
          break;

        case 'Bíceps':
          this.session.biceps.push(exercise);
          break;

        case 'Tríceps':
          this.session.triceps.push(exercise);
        break;

        case 'Hombros':
          this.session.hombro.push(exercise);
          break;

        case 'Trapecio':
          this.session.trapecio.push(exercise);
          break;

        case 'Abdomen':
          this.session.abdomen.push(exercise);
          break;
      }
    }
  };

  setGroup(){
    if(this.session.data.gender === 'Hombre') {
      if(this.session.data.time === '12 o más') {
        this.session.group = JSON.parse(this.session.groupC);
      }else if(this.session.data.time === "0 - 5 meses") {
        this.session.group = JSON.parse(this.session.groupA);
      }else {
        this.session.group = JSON.parse(this.session.groupB);
      }
    }else if(this.session.data.gender === 'Mujer') {
      if(this.session.data.time === '12 o más') {
        this.session.group = JSON.parse(this.session.groupE);
      }else if(this.session.data.time === "0 - 5 meses") {
        this.session.group = JSON.parse(this.session.groupD);
      }else {
        this.session.group = JSON.parse(this.session.groupD);
      }
    }
  };

  presentModal(id: string) {
    var self = this;

    if(id){
      let modal = self.modalCtrl.create(SessionItemComponent);
      let place:string = '1';
      self.splash.show();

      self.session.getEjercicio(id, place).then(response => {
        self.session.exercise = response;
        self.session.exercise.pasos = JSON.parse(response.pasos);
        self.session.exercise.repeticiones = JSON.parse(response.repeticiones);
        self.session.exercise.series = JSON.parse(response.series);
        self.splash.hide();
        modal.present();
      });
    }
  };

  startRutine(){
    var self = this;
    let currentDate = new Date();
    self.user.internalData.dtBegin = currentDate.toString();
    self.navCtrl.push(RutineComponent);
  };

  showWarm(){
    let modal = this.modalCtrl.create(WarmComponent);
    modal.present();
  };
}
