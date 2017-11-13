import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

@Injectable()
export class SessionService {
  private baseUrl = 'http://localhost:8080';
  //private baseUrl = 'http://ec2-52-42-164-164.us-west-2.compute.amazonaws.com:4500';
  public dataItems = {
    genders:[{name:'Hombre',id:0},{name:'Mujer',id:1}],
    times:[{name:'0 - 5 meses',id:0},{name:'6 - 11 meses',id:1},{name:'12 o más',id:2}],
    targets:[{name:'Aumentar masa',id:0},{name:'Tonificar',id:1},{name:'Bajar de peso',id:2}],
    places:[{name:'Casa',id:0},{name:'Gimnasio',id:1}],
    muscles:[],
    bodyParts: [{ name: 'Tren superior', id: 1 }, { name: 'Tren inferior', id: 2 }, { name: 'Cuerpo completo', id: 3 }, { name: 'Abdomen', id: 4 },]
  };
  public bodyParts = [
    { name: 'Tren superior', id: 6 },
    { name: 'Tren inferior', id: 6 },
    { name: 'Cuerpo completo', id: 6 },
    { name: 'Abdominales', id: 6 },
  ];
  public muscles = [
    { name: 'Pecho', id: 6 },
    { name: 'Espalda', id: 2 },
    { name: 'Muslos', id: 4 },
    { name: 'Hombros', id: 3 },
    { name: 'Trapecio', id: 7 },
    { name: 'Bíceps', id: 1 },
    { name: 'Tríceps', id: 8 },
    { name: 'Pantorrillas', id: 5 },
    { name: 'Abdomen', id: 0 }
  ];
  public data = {gender:'',time:'',target:'',place:'',muscles:[],warm:false, bodyParts:[]};
  public stretchData = {allMuscles: [
    { name: 'Abdomen', id: 0, valueName: 'Abdomen' },
    { name: 'Bíceps', id: 1, valueName: 'Biceps' },
    { name: 'Espalda', id: 2, valueName: 'Espalda' },
    { name: 'Hombros', id: 3, valueName: 'Hombros' },
    { name: 'Muslos', id: 4, valueName: 'Muslos' },
    { name: 'Pantorrillas', id: 5, valueName: 'Pantorrillas' },
    { name: 'Pecho', id: 6, valueName: 'Pecho' },
    { name: 'Trapecio', id: 7, valueName: 'Trapecio' },
    { name: 'Tríceps', id: 8, valueName: 'Triceps' }
  ], muscles: [], stretchSession: []};
  public groupA = '[ 3, 3, 4, 1, 2, 2, 4, 1, 2 ]';
  public groupB = '[ 4, 4, 4, 2, 3, 3, 4, 2, 2 ]';
  public groupC = '[ 5, 5, 5, 2, 4, 4, 5, 2, 2 ]';
  public groupD = '[ 3, 3, 4, 1, 2, 2, 3, 2 ]';
  public groupE = '[ 3, 3, 5, 1, 2, 2, 3, 2 ]';
  public index = ['Pecho','Espalda','Muslos','Pantorrillas','Bíceps','Tríceps','Hombros','Trapecio','Abdomen'];
  public group = [];
  public fullData = [];
  public pecho = [];
  public espalda = [];
  public muslo = [];
  public pantorrilla = [];
  public biceps = [];
  public triceps = [];
  public hombro = [];
  public trapecio = [];
  public abdomen = [];
  public list = [];
  public exercise = {gif: '', imagen: ''};
  public current = {id: '', tips: [], gif: ''};
  public currentIndex = 0;
  public dictionary = [
    {
      type: 'Abdomen',
      excercises: [
        {id:35,name:'crunches_nombre',machines:[{"S":"Colchonera"},{"S":"Banco"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Abs/642x361_Sit-Ups_vs._Crunches_0.jpg'},
        {id:36,name:'planchas_nombre',machines:[{"S":"Colchonera"},{"S":"Banco"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Abs/plank.jpg'},
        {id:37,name:'crunches_invertidos_nombre',machines:[{"S":"Colchonera"},{"S":"Banco"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Abs/Crunches+invertidos1.jpg'},
        {id:88,name:'bicicletas_nombre',machines:[{"S":"Colchonera"},{"S":"Banco"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Abs/BicicletasHombre.JPG'},
        {id:89,name:'tijeras_nombre',machines:[{"S":"Colchonera"},{"S":"Banco"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Abs/TijerasHombre.JPG'},
        {id:90,name:'sit_ups_nombre',machines:[{"S":"Colchonera"},{"S":"Banco"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Abs/sit-ups.JPG'},
        {id:91,name:'elevacion_de_piernas_nombre',machines:[{"S":"Colchonera"},{"S":"Banco"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Abs/ElevacionPiernas_Hombre.jpg'},
        {id:92,name:'elevacion_de_piernas_cadera_acostado_nombre',machines:[{"S":"Colchonera"},{"S":"Banco"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Abs/Elevaci%C3%B3nCrunchesInvertidos_Hombre.JPG'},
        {id:93,name:'crunches_con_pies_juntos_nombre',machines:[{"S":"Colchonera"},{"S":"Banco"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Abs/CrunchesPiesJuntos_Hombre.JPG'},
        {id:94,name:'crunches_con_elevacion_de_piernas_nombre',machines:[{"S":"Colchonera"},{"S":"Banco"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Abs/CrunchesPiesElevados_Hombre.JPG'},
        {id:95,name:'crunches_laterales_nombre',machines:[{"S":"Colchonera"},{"S":"Banco"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Abs/CrunchesLaterales_Hombre.JPG'},
        {id:96,name:'crunches_en_maquina_nombre',machines:[{"S":"Máquina específica"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Abs/CrunchesEnMaquina_Hombre.jpg'},
        {id:97,name:'crunches_en_balon_nombre',machines:[{"S":"Colchonera"},{"S":"Banco"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Abs/CrunchesEnBalon_Hombre.JPG'},
        {id:98,name:'crunches_en_v_nombre',machines:[{"S":"Colchonera"},{"S":"Banco"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Abs/Crunches+V_Hombre.JPG'},
        {id:99,name:'crunches_invertidos_en_banco_inclinado_nombre',machines:[{"S":"Colchonera"},{"S":"Banco"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Abs/Crunches+invertidos+inclinado_Hombre_GIF.jpg'}
      ]
    },
    {
      type: 'Bíceps',
      excercises: [
      ]
    },
    {
      type: 'Cuerpo completo',
      excercises: [
      ]
    },
    {
      type: 'Espalda',
      excercises: [
      ]
    },
    {
      type: 'Hombros',
      excercises: [
      ]
    },
    {
      type: 'Muslos',
      excercises: [
      ]
    },
    {
      type: 'Pantorrillas',
      excercises: [
      ]
    },
    {
      type: 'Pecho',
      excercises: [
      ]
    },
    {
      type: 'Trapecio',
      excercises: [
      ]
    },
    {
      type: 'Tren superior',
      excercises: [
      ]
    },
    {
      type: 'Tren inferior',
      excercises: [
      ]
    },
    {
      type: 'Tríceps',
      excercises: [
      ]
    },
  ];

  constructor(private http: Http) { };

  public getEjercicio(id: string) {
    let url = this.baseUrl + '/get-ejercicio';
    let params: URLSearchParams = new URLSearchParams();

    params.set('id', id);

    return this.http.get(url, { params: params })
      .toPromise()
      .then(this.extractData)
      .then(response => response);
  };

  public getEjercicesByMuscle(muscles: string) {
    let url = this.baseUrl + '/get-ejercicesByMuscle';
    let params: URLSearchParams = new URLSearchParams();

    params.set('muscles', muscles);

    return this.http.get(url, { params: params })
      .toPromise()
      .then(this.extractData)
      .then(response => response);
  };

  public getHomeEjercices(place: string, trainingType: string, trainingZone: string) {
    let url = this.baseUrl + '/get-warmUpByPlaceTypeZone';
    let params: URLSearchParams = new URLSearchParams();

    params.set('place', place);
    params.set('trainingType', trainingType);
    params.set('corporalZone', trainingZone);

    return this.http.get(url, { params: params })
      .toPromise()
      .then(this.extractData)
      .then(response => response);
  };

  public getWarmByPlace(place: string) {
    let url = this.baseUrl + '/get-warmUpByPlaceTypeZone';
    let params: URLSearchParams = new URLSearchParams();

    params.set('place', place);
    params.set('trainingType', '["Cardiovascular", "Musculación"]');
    params.set('corporalZone', 'Tren inferior');

    return this.http.get(url, { params: params })
      .toPromise()
      .then(this.extractData)
      .then(response => response);
  };

  private extractData(res: Response) {
    const body = res.json();
    return body || {};
  };
}
