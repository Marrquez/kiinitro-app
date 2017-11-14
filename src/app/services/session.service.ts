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
  public warmExercises = [];
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
        {id:6,name:'flexion_codo_curl_nombre',machines:[{"S":"Barra Z"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Biceps/curl+barra+z.jpg'},
        {id:7,name:'predicador_nombre',machines:[{"S":"Barra recta"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Biceps/predicador.jpg'},
        {id:8,name:'concentrado_nombre',machines:[{"S":"Mancuerna"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Biceps/curl_biceps_concentrado_apoyo_muslo.jpg'},
        {id:9,name:'flexion_codo_martillo_nombre',machines:[{"S":"Barra romana"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Biceps/martillo+romana+variante.jpg'},
        {id:42,name:'flexion_codo_curl_nombre',machines:[{"S":"Barra recta"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Biceps/Curl+barra1.jpg'},
        {id:43,name:'flexion_codo_curl_nombre',machines:[{"S":"Polea"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Biceps/polea+pie.jpg'},
        {id:44,name:'flexion_codo_curl_nombre',machines:[{"S":"Mancuerna"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Biceps/curl+mancuernas+2+manos.png'},
        {id:45,name:'predicador_nombre',machines:[{"S":"Barra Z"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Biceps/predicador.jpg'},
        {id:46,name:'predicador_nombre',machines:[{"S":"Máquina"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Biceps/curl+banco+predicador+maquina.jpg'},
        {id:47,name:'predicador_nombre',machines:[{"S":"Mancuerna"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Biceps/curl+banco+predicador+mancuerna.gif'},
        {id:48,name:'flexion_codo_martillo_nombre',machines:[{"S":"Mancuerna"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Biceps/martillo.png'},
        {id:49,name:'flexion_codo_martillo_nombre',machines:[{"S":"Polea lazo"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Biceps/martillo+polea.jpg'},
      ]
    },
    {
      type: 'Cuerpo completo',
      excercises: [
        {id:25,name:'burpee_sin_flexion_nombre',machines:[{"S":"body_height"}],place: 'home', img:''},
        {id:26,name:'saltos_laterales_nombre',machines:[{"S":"body_height"}],place: 'home', img:''},
        {id:27,name:'cuatro_en_uno_nombre',machines:[{"S":"body_height"}],place: 'home', img:''},
        {id:28,name:'escaladores_nombre',machines:[{"S":"body_height"}],place: 'home', img:''},
        {id:29,name:'guerrero_a_una_pierna_nombre',machines:[{"S":"body_height"}],place: 'home', img:''},
        {id:30,name:'paso_de_oso_nombre',machines:[{"S":"body_height"}],place: 'home', img:''},
        {id:31,name:'saltos_con_pausa_nombre',machines:[{"S":"body_height"}],place: 'home', img:''},
        {id:32,name:'paso_de_cangrejo_lateral_nombre',machines:[{"S":"body_height"}],place: 'home', img:''},
        {id:33,name:'burpee_con_flexion_nombre',machines:[{"S":"body_height"}],place: 'home', img:''},
        {id:34,name:'orugas_nombre',machines:[{"S":"body_height"}],place: 'home', img:''},
      ]
    },
    {
      type: 'Espalda',
      excercises: [
        {id:10,name:'dominadas_nombre',machines:[{"S":"Barra fija"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Back/dominadas.jpg'},
        {id:11,name:'jalon_frontal_abierto_nombre',machines:[{"S":"Máquina de polea"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Back/espalda_jalones-frente_01.jpg'},
        {id:12,name:'jalon_frontal_cerrado_agarre_neutro_nombre',machines:[{"S":"Máquina de polea"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Back/jalon+frontal+cerrado.png'},
        {id:13,name:'remo_mancuerna_nombre',machines:[{"S":"Mancuerna"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Back/remo+barra.png'},
        {id:14,name:'remo_polea_bajo_barra_v_nombre',machines:[{"S":"Máquina de polea"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Back/remo+bajo+polea.jpg'},
        {id:50,name:'dominadas_asistidas_nombre',machines:[{"S":"Máquina"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Back/DominadasAsistidasHombre.jpg'},
        {id:51,name:'jalon_frontal_abierto_nombre',machines:[{"S":"Máquina Hammer"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Back/Jalon+Frontal+Abierto+Hammer.jpg'},
        {id:52,name:'jalon_frontal_cerrado_supino_nombre',machines:[{"S":"Máquina de polea"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Back/JalonFrontalCerradoSupinoHombre.jpg'},
        {id:53,name:'remo_barra_supino_nombre',machines:[{"S":"Barra"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Back/remo+barra.png'},
        {id:54,name:'remo_barra_prono_nombre',machines:[{"S":"Barra"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Back/remo+barra.png'},
        {id:55,name:'remo_polea_bajo_supino_nombre',machines:[{"S":"Máquina de polea"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Back/RemoBajoPoleaSupinoHombre.jpg'},
        {id:56,name:'remo_polea_bajo_prono_nombre',machines:[{"S":"Máquina de polea"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Back/RemoBajoPoleaPronoHombre.jpg'},
        {id:57,name:'remo_anclado_nombre',machines:[{"S":"Máquina de polea"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Back/RemoAncladoHombre.jpg'},
        {id:58,name:'remo_barra_t_neutro_nombre',machines:[{"S":"Barra recta con barra V"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Back/RemoBarraTHombre.gif'},
        {id:59,name:'remo_barra_t_maquina_nombre',machines:[{"S":"Máquina T"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Back/RemoBarraTM%C3%A1quinaHombre.jpg'},
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

  public getWarmByPlace(place: string, type: string) {
    let url = this.baseUrl + '/get-warmUpByPlaceType';
    let params: URLSearchParams = new URLSearchParams();

    params.set('place', place);
    params.set('trainingType', type);

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
