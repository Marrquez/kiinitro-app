import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';

import { SessionItemComponent } from '../session-item/session-item.component';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'sessions',
  templateUrl: 'sessions.component.html'
})
export class SessionsComponent implements OnInit {
  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public session: SessionService,
    private splash: SplashScreen
  ) { };

  ngOnInit() {
    //this.splash.show();
    this.getTasks();
  };

  getTasks(){
    var self = this;
    this.setGroup();
    let muscles = JSON.stringify(this.session.data.muscle.split('-'));
    this.session.list = [];

    this.session.getEjercicesByMuscle(muscles).then(response => {
      self.session.fullData = response.data;
      self.updateArrays();
      self.selectExercises();
    });
  };

  addElements(indice: number, list: any){
    var cantidad: number = this.session.group[indice];
    var total = list.length;
    var arr = [];

    if(cantidad <= list.length){
      while(arr.length < cantidad){
        var randomnumber = Math.floor((Math.random() * total) + 1) - 1;
        if(arr.indexOf(randomnumber) > -1) continue;
        arr[arr.length] = randomnumber;
      }

      for(var j = 0; j < arr.length; j++){
        this.session.list.push(list[arr[j]]);
      }
    }else {
      console.log("Hay un error");
    }
  };

  selectExercises(){
    let muscles = this.session.data.muscle.split('-');

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

        case 'Pantorrilla':
          var quantity = this.session.index.indexOf('Pantorrilla');
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

        case 'Pantorrilla':
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
    if(this.session.data.gender === 'Hombre'){
      if(this.session.data.time === '12 o más'){
        this.session.group = JSON.parse(this.session.groupC);
      }else if(this.session.data.time === "0 - 5 meses") {
        this.session.group = JSON.parse(this.session.groupA);
      }else {
        this.session.group = JSON.parse(this.session.groupB);
      }
    }else if(this.session.data.gender === 'Mujer'){
      if(this.session.data.time === '12 o más'){
        this.session.group = JSON.parse(this.session.groupE);
      }else if(this.session.data.time === "0 - 5 meses") {
        this.session.group = JSON.parse(this.session.groupD);
      }else {
        this.session.group = JSON.parse(this.session.groupD);
      }
    }
  };

  presentModal() {
    let modal = this.modalCtrl.create(SessionItemComponent);
    modal.present();
  };
}
